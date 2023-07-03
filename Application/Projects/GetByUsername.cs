

using Application.Core;
using Application.interfaces;
using Application.Projects.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class GetByUsername
    {
        public class Query : IRequest<Result<List<ProjectDTO>>>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProjectDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<List<ProjectDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(a => a.Projects)
                        .ThenInclude(a => a.Consultants)
                    .FirstOrDefaultAsync(a => a.UserName == request.UserName);
                if (user == null) return null;

                var projects = user.Projects
                    .Where(a => userAccessor.GetUsername() == request.UserName ? true : a.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .AsQueryable();

                return Result<List<ProjectDTO>>.Success(projects.ProjectTo<ProjectDTO>(mapper.ConfigurationProvider).ToList());
            }
        }
    }
}
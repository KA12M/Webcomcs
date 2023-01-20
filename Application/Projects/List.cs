 
using Application.Core;
using Application.Projects.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ProjectDTO>>>
        {
            public ProjectParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ProjectDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<PagedList<ProjectDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Projects
                    .Include(a => a.Student)
                        .ThenInclude(a => a.Student)
                    .Where(a => a.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .AsQueryable();

                if (!request.Params.Search.IsNullOrEmpty())
                {
                    var word = request.Params.Search.ToString().ToLower();
                    query = query.Where(a =>
                        a.NameTH.ToLower().Contains(word) ||
                        a.NameEN.ToLower().Contains(word) ||
                        a.Student.UserName.ToLower().Contains(word) ||
                        a.Student.Student.YearEdu.ToString().ToLower().Contains(word)
                    );
                }
                
                var data = query.ProjectTo<ProjectDTO>(mapper.ConfigurationProvider);
                return Result<PagedList<ProjectDTO>>.Success(await PagedList<ProjectDTO>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
            }
        }
    }
}
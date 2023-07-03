
using Application.Core;
using Application.Courses.DTOS;
using Application.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class ListGeneration
    {
        public class Query : IRequest<Result<PagedList<GenerationList>>>
        {
            public GenerationParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<GenerationList>>>
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

            public async Task<Result<PagedList<GenerationList>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Generations
                    .Include(a => a.Attendees)
                        .ThenInclude(a => a.AppUser)
                    .Include(a => a.Course)
                        .ThenInclude(a => a.Photos)
                    .Include(a => a.Course)
                        .ThenInclude(a => a.Lecturer)
                    .Where(a => a.Course.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .AsQueryable();

                if (request.Params.MyCourse)
                {
                    query = query.Where(a => a.Course.Lecturer.UserName == userAccessor.GetUsername() || a.Attendees.Any(a => a.AppUser.UserName == userAccessor.GetUsername()));
                }

                if (!String.IsNullOrEmpty(request.Params.Search))
                {
                    string word = request.Params.Search;
                    query = query
                        .Where(a => a.Course.Title.Contains(word) || a.Course.Lecturer.FullName.Contains(word) || a.SubTitle.Contains(word));
                }

                var data = query.ProjectTo<GenerationList>(mapper.ConfigurationProvider, new { LecturerUsername = userAccessor.GetUsername() });
                return Result<PagedList<GenerationList>>.Success(await PagedList<GenerationList>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
            }
        }
    }
}
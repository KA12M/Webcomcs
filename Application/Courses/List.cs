
using Application.Core;
using Application.Courses.DTOS;
using Application.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Courses
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CourseDTO>>>
        {
            public CourseParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CourseDTO>>>
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

            public async Task<Result<PagedList<CourseDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Courses
                    .Where(a => a.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .Include(a => a.Lecturer)
                    .Include(a => a.Photos)
                    .Include(a => a.Generations)
                        .ThenInclude(a => a.Attendees)
                    .AsQueryable();

                if (request.Params.MyCourse)
                {
                    query = query.Where(a => a.Lecturer.UserName == userAccessor.GetUsername());
                }

                if (!String.IsNullOrEmpty(request.Params.Search))
                {
                    string word = request.Params.Search;
                    query = query
                        .Where(a => a.Title.Contains(word)
                        || a.Lecturer.FullName.Contains(word));
                }

                if (!request.Params.HostUsername.IsNullOrEmpty()) query = query.Where(a => a.Lecturer.UserName == request.Params.HostUsername);

                var data = query.ProjectTo<CourseDTO>(mapper.ConfigurationProvider);
                return Result<PagedList<CourseDTO>>.Success(await PagedList<CourseDTO>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
            }
        }
    }
}

using Application.Core;
using Application.Courses.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<PagedList<CourseDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Courses
                    .Where(a => a.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .Include(a => a.Photos)
                    .Include(a => a.Generations)
                        .ThenInclude(a => a.Attendees)
                    .AsQueryable();
                
                var data = query.ProjectTo<CourseDTO>(mapper.ConfigurationProvider);
                return Result<PagedList<CourseDTO>>.Success(await PagedList<CourseDTO>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
            }
        }
    }
}
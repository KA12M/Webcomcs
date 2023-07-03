
using Application.Core;
using Application.Courses.DTOS;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class DetailCourse
    {
        public class Query : IRequest<Result<CourseDetail>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CourseDetail>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<CourseDetail>> Handle(Query request, CancellationToken cancellationToken)
            {
                var course = await context.Courses
                    .Where(a => a.IsUsed)
                    .Include(a => a.Photos)
                    .Include(a => a.Lecturer)
                    .Include(a => a.Generations)
                        .ThenInclude(a => a.Attendees)
                            .ThenInclude(a => a.AppUser)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);

                if (course == null) return null;

                return Result<CourseDetail>.Success(mapper.Map<CourseDetail>(course));
            }
        }
    }
}
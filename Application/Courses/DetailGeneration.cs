
using Application.Core;
using Application.Courses.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class DetailGeneration
    {
        public class Query : IRequest<Result<CourseGenerationDetail>>
        {
            public Guid Id { get; set; }
            public Guid GenerationId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CourseGenerationDetail>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<CourseGenerationDetail>> Handle(Query request, CancellationToken cancellationToken)
            {
                var course = await context.Courses
                    .Where(a => a.IsUsed)
                    .Include(a => a.Photos)
                    .Include(a => a.Lecturer)
                    .Include(a => a.Generations)
                        .ThenInclude(a => a.Attendees)
                            .ThenInclude(a => a.AppUser)
                    .ProjectTo<CourseGenerationDetail>(mapper.ConfigurationProvider, new { GenerationId = request.GenerationId })
                    .SingleOrDefaultAsync(a => a.Id == request.Id);
                if (course.Generation == null) return null;

                return Result<CourseGenerationDetail>.Success(course);
            }
        }
    }
}
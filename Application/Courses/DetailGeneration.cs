
using Application.Core;
using Application.Courses.DTOS;
using Application.interfaces;
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
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CourseGenerationDetail>>
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

            public async Task<Result<CourseGenerationDetail>> Handle(Query request, CancellationToken cancellationToken)
            {
                var generation = await context.Generations
                    .Include(a => a.Course)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                if (generation == null) return null;

                var courses = await context.Courses
                    .Where(a => a.IsUsed)
                    .Include(a => a.Photos)
                    .Include(a => a.Lecturer)
                    .Include(a => a.Generations)
                        .ThenInclude(a => a.Attendees)
                            .ThenInclude(a => a.AppUser)
                    .ProjectTo<CourseGenerationDetail>(mapper.ConfigurationProvider, new { GenerationId = generation.Id, Username = userAccessor.GetUsername()})
                    .SingleOrDefaultAsync(a => a.Id == generation.Course.Id);
                if (courses.Generation == null) return null; 

                return Result<CourseGenerationDetail>.Success(courses);
            }
        }
    }
}
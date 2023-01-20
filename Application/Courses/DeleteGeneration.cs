
using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class DeleteGeneration
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid CourseId { get; set; }
            public Guid GenerationId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var course = await context.Courses
                    .Include(a => a.Generations)
                        .ThenInclude(a => a.Attendees)
                    .Include(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.CourseId);
                if (course == null) return null;

                var generationCurrent = course.Generations.FirstOrDefault(a => a.Id == request.GenerationId);
                if (generationCurrent == null) return null;

                if (course.Lecturer.UserName != userAccessor.GetUsername()) return Result<Unit>.Failure("Permission denied.");

                context.Generations.Remove(generationCurrent);
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem deleting generation.");
            }
        }
    }
}

using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class DeleteCourse
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid CourseId { get; set; } 
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
                    .Include(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.CourseId);
                if (course == null) return null; 

                if (course.Lecturer.UserName != userAccessor.GetUsername()) return Result<Unit>.Failure("Permission denied.");

                course.IsUsed = !course.IsUsed;
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem deleting course.");
            }
        }
    }
}
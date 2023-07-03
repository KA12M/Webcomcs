
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
            public string GenerationId { get; set; }
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
                var currentGeneration = await context.Generations
                    .Include(a => a.Attendees)
                        .ThenInclude(a => a.AppUser)
                    .Include(a => a.Course)
                        .ThenInclude(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.GenerationId);
                if (currentGeneration == null) return null;

                if (currentGeneration.Course.Lecturer.UserName != userAccessor.GetUsername()) return Result<Unit>.Failure("Permission denied.");

                context.Generations.Remove(currentGeneration);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem deleting generation.");
            }
        }
    }
}
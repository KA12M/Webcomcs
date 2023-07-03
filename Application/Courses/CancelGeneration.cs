
using Application.Core;
using Application.interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class CancelGeneration
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
                var generationCurrent = await context.Generations
                    .Include(a => a.Course)
                        .ThenInclude(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.GenerationId);
                if (generationCurrent == null) return null;

                if (generationCurrent.Course.Lecturer.UserName != userAccessor.GetUsername()) return Result<Unit>.Failure("Problem update status of course.");

                generationCurrent.IsCancelled = !generationCurrent.IsCancelled;
                
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem update status of course.");
            }
        }
    }
}
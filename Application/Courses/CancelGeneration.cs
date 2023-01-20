
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
                var user = await context.Users
                    .Include(a => a.Courses)
                        .ThenInclude(a => a.Generations)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                var course = user.Courses.FirstOrDefault(a => a.Id == request.CourseId);
                if (course == null) return null;

                var generationCurrent = course.Generations.FirstOrDefault(a => a.Id == request.GenerationId);
                if (generationCurrent == null) return null;
                
                generationCurrent.IsCancelled = !generationCurrent.IsCancelled;
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem update status of course.");
            }
        }
    }
}

using System.Diagnostics.CodeAnalysis;
using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var project = await context.Projects
                    .Include(a => a.Student)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);

                if (project.Student.UserName != userAccessor.GetUsername()) return Result<Unit>.Failure("You do not have the right.");

                context.Projects.Remove(project);

                var result = await context.SaveChangesAsync() > 0; 
                if (!result) return Result<Unit>.Failure("Failed to delete the project.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
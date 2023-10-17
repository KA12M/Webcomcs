
using System.Diagnostics.CodeAnalysis;
using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
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
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await context.Projects
                    .Include(a => a.Student)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);

                if (project == null) return null;

                var user = await userManager.FindByNameAsync(userAccessor.GetUsername());
                var roles = await userManager.GetRolesAsync(user);

                if (roles.Contains("Admin") || project.Student.UserName == userAccessor.GetUsername())
                {
                    context.Projects.Remove(project);

                    var result = await context.SaveChangesAsync() > 0;
                    if (!result) return Result<Unit>.Failure("Failed to delete the project.");

                    return Result<Unit>.Success(Unit.Value);
                }
                else return Result<Unit>.Failure("You do not have the right.");
            }
        }
    }
}
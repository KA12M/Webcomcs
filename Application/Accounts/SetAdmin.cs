
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class SetAdmin
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(a => a.UserName == request.Username);
                if (user == null) return null;

                var roleCurrent = await userManager.GetRolesAsync(user);
                if (!roleCurrent.Any(a => a == "Admin")) await userManager.AddToRoleAsync(user, "Admin");
                else await userManager.RemoveFromRoleAsync(user, "Admin");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
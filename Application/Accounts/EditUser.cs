 
using MediatR;
using Persistence;
using Application.Core;
using Application.Accounts.DTOS;
using Microsoft.AspNetCore.Identity;
using Domain;
using Microsoft.IdentityModel.Tokens;
using Domain.DTOS;
using Microsoft.EntityFrameworkCore;

namespace Application.Accounts
{
    public class EditUser
    {
        public class Command : IRequest<Result<Unit>>
        {
            public FormEditUser User { get; set; }
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
                var user = await context.Users.FirstOrDefaultAsync(a => a.UserName == request.User.CurrentUsername);
                if (user == null) return null;

                if (!request.User.Email.IsNullOrEmpty())
                {
                    var result = await userManager.SetEmailAsync(user, request.User.Email);
                    if (!result.Succeeded) return Result<Unit>.Failure("Problem email changing.");
                }

                if (!request.User.Password.IsNullOrEmpty())
                {
                    await userManager.RemovePasswordAsync(user);
                    var result = await userManager.AddPasswordAsync(user, request.User.Password);
                    if (!result.Succeeded) return Result<Unit>.Failure("Problem password changing.");
                }

                if (!request.User.Username.IsNullOrEmpty())
                {
                    var result = await userManager.SetUserNameAsync(user, request.User.Username);
                    if (!result.Succeeded) return Result<Unit>.Failure("Problem username changing.");
                }

                if (user.IsRole != request.User.Role)
                {
                    await userManager.RemoveFromRoleAsync(user, Enum.GetName(typeof(UserRole), user.IsRole));
                    await userManager.AddToRoleAsync(user, Enum.GetName(typeof(UserRole), request.User.Role));
                    user.IsRole = request.User.Role;
                };

                context.Entry(user).State = EntityState.Modified;
                
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem edit data.");
            }
        }
    }
}
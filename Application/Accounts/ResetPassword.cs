
using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Accounts
{
    public class ResetPassword
    {
        public class Command : IRequest<Result<Unit>>
        { 
            public string CurrentPassword { get; set; }
            public string NewPassword { get; set; }
        }

        public class Handle : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;

            public Handle(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
            }

            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetUsername());
                if (user == null) return null;

                var result = await userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
                if (!result.Succeeded) return Result<Unit>.Failure("รหัสผ่านเดิมไม่ถูกต้อง");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
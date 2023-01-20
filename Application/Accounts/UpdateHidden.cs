
using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class UpdateHidden
    {
        public class Command : IRequest<Result<Unit>>
        {
        }

        public class Handle : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handle(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());
                if (user == null) return null;

                user.Hidden = !user.Hidden;
                context.Entry(user).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Problem updating hidden."); 
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobHistory
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            
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
                    .Include(a => a.JobHistory)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                if (user.JobHistory != null) context.JobHistories.Remove(user.JobHistory);

                context.Entry(user).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem with remove data job history.");
            }
        }
    }
}
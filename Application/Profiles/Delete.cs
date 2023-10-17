
using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext context;

        public Handler(DataContext context)
        {
            this.context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var currentUser = await context.Users.FirstOrDefaultAsync(a => a.UserName == request.Username);

            if (currentUser == null) return null;

            currentUser.IsUsed = false;

            var success = await context.SaveChangesAsync() > 0;
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem removing account!");
        }
    }
}

using Application.Core;
using Application.interfaces;
using Application.JobHistory.DTOS;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobHistory
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public JobHistoryDTO JobHistory { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(a => a.JobHistory)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                user.JobHistory = mapper.Map<Domain.JobHistory>(request.JobHistory);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem with creating job history.");
            }
        }
    }
}
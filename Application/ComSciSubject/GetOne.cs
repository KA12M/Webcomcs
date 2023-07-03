
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ComSciSubject
{
    public class GetOne
    {
        public class Query : IRequest<Result<ComputerScienceSubject>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ComputerScienceSubject>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<ComputerScienceSubject>> Handle(Query request, CancellationToken cancellationToken)
            {
                var data = await context.ComputerScienceSubjects
                    .Include(a => a.Photos)
                    .SingleOrDefaultAsync(a => a.Id == request.Id);

                if (data == null) return null;

                return Result<ComputerScienceSubject>.Success(data);
            }
        }
    }
}
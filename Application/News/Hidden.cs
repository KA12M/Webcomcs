

using Application.Core;
using MediatR;
using Persistence;

namespace Application.News
{
    public class Hidden
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var news = context.Newses.FirstOrDefault(a => a.Id == request.Id);
                if (news == null) return null;

                news.IsHidden = !news.IsHidden;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem set hidden news.");
            }
        }
    }
}
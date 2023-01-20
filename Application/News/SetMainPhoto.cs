
using System.Linq;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public Guid ImageId { get; set; }
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
                var news = await context.Newses
                    .Include(a => a.NewsPhotos)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                if (news == null) return null;

                var photo = news.NewsPhotos.FirstOrDefault(a => a.Id == request.ImageId);

                var currentPhoto = news.NewsPhotos.FirstOrDefault(a => a.IsMain);
                if (currentPhoto != null) currentPhoto.IsMain = false;

                photo.IsMain = true; 

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem setting main photo."); 
            }
        }
    }
}
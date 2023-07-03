
using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CourseComment
{
    public class Remove
    {
        public class Command : IRequest<Result<Guid>>
        {
            public Guid CommentId { get; set; }
            public string GenerationId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                var generation = await context.Generations
                    .Include(a => a.Comments)
                        .ThenInclude(a => a.Author) 
                    .Include(a => a.Course)
                        .ThenInclude(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.GenerationId);

                var comment = generation.Comments.FirstOrDefault(a => a.Id == request.CommentId);
                if (comment == null) return null;

                if (comment.Author.UserName == userAccessor.GetUsername() || generation.Course.Lecturer.UserName == userAccessor.GetUsername())
                { context.Remove(comment); }
                else return Result<Guid>.Failure("Permissions.");

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Guid>.Success(request.CommentId) : Result<Guid>.Failure("Problem to deleting.");
            }
        }
    }
}
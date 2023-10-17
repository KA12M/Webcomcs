
using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Lecturers
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUploadFileAccessor uploadFileAccessor;

            public Handler(DataContext context, IUploadFileAccessor uploadFileAccessor)
            {
                this.context = context;
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var lecturer = await context.Lecturers.FirstOrDefaultAsync(a => a.Id == request.Id);
                if (lecturer == null) return null;

                // await uploadFileAccessor.Delete(lecturer.Image);
                context.Lecturers.Remove(lecturer);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to delete data.");
            }
        }
    }
}
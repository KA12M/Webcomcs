using Application.Core;
using Application.interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class UpdateMe
    {
        public class Command : IRequest<Result<string>>
        {
            public string FullName { get; set; }
            public string Bio { get; set; }
            public IFormFileCollection FileImages { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FullName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IUploadFileAccessor uploadFileAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IUploadFileAccessor uploadFileAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user == null) return Result<string>.Failure("Problem for update profile.");

                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOne(request.FileImages);
                if (!string.IsNullOrEmpty(errorMessage)) return Result<string>.Failure(errorMessage);
                if (!string.IsNullOrEmpty(imageName))
                {
                    if (!string.IsNullOrEmpty(user.Image)) await uploadFileAccessor.Delete(user.Image!);
                    user.Image = imageName;
                }

                user.Bio = request.Bio ?? user.Bio;
                user.FullName = request.FullName ?? user.FullName;

                context.Entry(user).State = EntityState.Modified;
                var success = await context.SaveChangesAsync() > 0;
                if (success) return Result<string>.Success("Success for updated.");
                return Result<string>.Failure("Problem updating profile");
            } 
        }
    }
}
using Application.Accounts.DTOS;
using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class UpdateMe
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AccountUpdate Account { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Account.FullName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IUploadFileAccessor uploadFileAccessor, IMapper mapper)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.uploadFileAccessor = uploadFileAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(a => a.Student)
                    .Include(a => a.Lecturer)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user == null) return Result<Unit>.Failure("Problem for update profile.");

                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.Account.FileImages);
                if (!string.IsNullOrEmpty(errorMessage)) return Result<Unit>.Failure(errorMessage);
                if (!string.IsNullOrEmpty(imageName))
                {
                    if (!string.IsNullOrEmpty(user.Image)) await uploadFileAccessor.Delete(user.Image!);
                    user.Image = imageName;
                }

                mapper.Map<AccountUpdate, AppUser>(request.Account, user);

                context.Entry(user).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating profile");
            }
        }
    }
}
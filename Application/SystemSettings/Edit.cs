

using Application.Core;
using Application.interfaces;
using Application.SystemSettings.DTOS;
using AutoMapper;
using Domain.Others;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.SystemSettings
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SystemSettingUpdate Setting { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUploadFileAccessor uploadFileAccessor;

            public Handler(DataContext context, IMapper mapper, IUploadFileAccessor uploadFileAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var setting = await context.SystemSettings.FirstOrDefaultAsync();

                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOne(request.Setting.FileImages);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);

                mapper.Map(request.Setting, setting);
                if (!imageName.IsNullOrEmpty()) setting.Logo = imageName;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to edit setting.");
            }
        }
    }
}
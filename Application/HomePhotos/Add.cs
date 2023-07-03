
using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain.Others;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.HomePhotos
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Title { get; set; } 
            public IFormFileCollection FileImages { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            { 
                RuleFor(x => x.FileImages).NotEmpty();
            }
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
                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.FileImages, 100, true);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);
                if (imageName.IsNullOrEmpty()) return Result<Unit>.Failure("Problem to add data.");
                
                var newPhoto = new HomePhoto
                {
                    Title = request.Title, 
                    Url = imageName 
                };
                context.HomePhotos.Add(newPhoto);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }


    }
}
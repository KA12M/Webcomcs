
using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain.Others;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.HomePhotos
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public string Title { get; set; } 
            public IFormFileCollection FileImage { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Title).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUploadFileAccessor uploadFileAccessor, IMapper mapper)
            {
                this.context = context;
                this.uploadFileAccessor = uploadFileAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var photo = await context.HomePhotos.FirstOrDefaultAsync(a => a.Id == request.Id);
                if (photo == null) return null;

                if (request.FileImage != null && request.FileImage.Count > 0)
                {
                    (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.FileImage);
                    if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);
                    if (imageName.IsNullOrEmpty()) return Result<Unit>.Failure("Problem to add data.");
                    photo.Url = imageName;
                }

                photo.Title = request.Title ?? photo.Title; 
                context.Entry(photo).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to edit data.");
            }
        }
    }
}

using Application.Core;
using Application.interfaces;
using Application.Lecturers.DTOS;
using AutoMapper;
using Domain.Others;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Lecturers
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {
            public LecturerCreate Lecturer { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Lecturer.Prefix).NotEmpty();
                RuleFor(x => x.Lecturer.FullName).NotEmpty();
                RuleFor(x => x.Lecturer.Position).NotEmpty();
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
                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.Lecturer.FileImage);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);

                var newLecturer = mapper.Map<Lecturer>(request.Lecturer);

                if (!imageName.IsNullOrEmpty()) newLecturer.Image = imageName;

                context.Lecturers.Add(newLecturer);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }
    }
}
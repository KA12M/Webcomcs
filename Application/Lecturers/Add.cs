
using Application.Core;
using Application.interfaces;
using Application.Lecturers.DTOS;
using AutoMapper;
using Domain.Others;
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
                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOne(request.Lecturer.FileImage);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);

                var prefix = await context.Prefixes
                    .FirstOrDefaultAsync(a => a.Name.ToLower().Contains(request.Lecturer.Prefixed.ToLower()));

                var newLecturer = mapper.Map<Lecturer>(request.Lecturer);

                if (prefix == null) newLecturer.Prefix = new Prefix { Name = request.Lecturer.Prefixed };
                else newLecturer.Prefix = prefix;

                if (!imageName.IsNullOrEmpty()) newLecturer.Image = imageName;

                context.Lecturers.Add(newLecturer);
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }
    }
}
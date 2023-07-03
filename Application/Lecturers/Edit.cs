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
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public LecturerUpdate Lecturer { get; set; }
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
                var lecturer = await context.Lecturers.FirstOrDefaultAsync(a => a.Id == request.Lecturer.Id);
                if (lecturer == null) return null;

                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.Lecturer.FileImage);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage); 

                mapper.Map<LecturerUpdate, Lecturer>(request.Lecturer, lecturer); 

                if (!imageName.IsNullOrEmpty())
                {
                    await uploadFileAccessor.Delete(lecturer.Image);
                    lecturer.Image = imageName;
                }

                context.Entry(lecturer).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to edit data.");
            }
        }
    }
}

using Application.Core;
using Application.interfaces;
using Application.Projects.DTOS;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProjectEdit Project { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Project.NameTH).NotEmpty();
                RuleFor(x => x.Project.NameEN).NotEmpty();
                RuleFor(x => x.Project.Description).NotEmpty();
                RuleFor(x => x.Project.VideoUrl).NotEmpty();
                RuleFor(x => x.Project.Consultants).Must(list => list.Count == 0).NotEmpty();
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
                var project = await context.Projects
                    .Include(a => a.Consultants)
                    .Include(a => a.Student)
                    .FirstOrDefaultAsync(a => a.Id == request.Project.Id);

                if (project.Student.UserName != userAccessor.GetUsername()) return Result<Unit>.Failure("You do not have the right to edit.");

                mapper.Map(request.Project, project);

                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOne(request.Project.FileImage);
                if (!string.IsNullOrEmpty(errorMessage)) return Result<Unit>.Failure(errorMessage);
                if (!string.IsNullOrEmpty(imageName)) project.Image = imageName;

                var fileUrl = await uploadFileAccessor.UpLoadFileOne(request.Project.FilePDF);
                if (!string.IsNullOrEmpty(fileUrl)) project.PDF = fileUrl; 

                var result = await context.SaveChangesAsync() > 0; 
                if (!result) return Result<Unit>.Failure("Failed to updated project.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
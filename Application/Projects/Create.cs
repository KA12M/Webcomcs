

using Application.Core;
using Application.interfaces;
using Application.Projects.DTOS;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProjectCreate Project { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Project.NameTH).NotEmpty();
                RuleFor(x => x.Project.NameEN).NotEmpty();
                RuleFor(x => x.Project.Description).NotEmpty();  
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IMapper mapper;
            private readonly IGenerationAccessor generationAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IUploadFileAccessor uploadFileAccessor, IMapper mapper, IGenerationAccessor generationAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.uploadFileAccessor = uploadFileAccessor;
                this.mapper = mapper;
                this.generationAccessor = generationAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(a => a.Projects)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                var newProject = mapper.Map<Project>(request.Project);

                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.Project.FileImage);
                if (!string.IsNullOrEmpty(errorMessage)) return Result<Unit>.Failure(errorMessage);
                if (!string.IsNullOrEmpty(imageName)) newProject.Image = imageName;

                var fileUrl = await uploadFileAccessor.UpLoadFileOneAsync(request.Project.FilePDF);
                if (!string.IsNullOrEmpty(fileUrl)) newProject.PDF = fileUrl; 

                newProject.Id = generationAccessor.GenerateId("PROJ");

                user.Projects.Add(newProject);

                var result = await context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create project.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
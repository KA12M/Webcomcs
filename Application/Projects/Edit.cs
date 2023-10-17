
using Application.Core;
using Application.interfaces;
using Application.Projects.DTOS;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
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
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IMapper mapper;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, IUploadFileAccessor uploadFileAccessor, IMapper mapper, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.uploadFileAccessor = uploadFileAccessor;
                this.mapper = mapper;
                this.userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await context.Projects
                    .Include(a => a.Consultants)
                    .Include(a => a.Student)
                    .FirstOrDefaultAsync(a => a.Id == request.Project.Id);

                if (project == null) return null;

                var user = await userManager.FindByNameAsync(userAccessor.GetUsername());
                var roles = await userManager.GetRolesAsync(user);

                if (roles.Contains("Admin") || project.Student.UserName == userAccessor.GetUsername())
                {
                    mapper.Map(request.Project, project);

                    if (request.Project.FileImage != null)
                    {
                        (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(request.Project.FileImage);
                        if (!string.IsNullOrEmpty(errorMessage)) return Result<Unit>.Failure(errorMessage);
                        if (!string.IsNullOrEmpty(imageName)) project.Image = imageName;
                    }

                    if (request.Project.FilePDF != null)
                    {
                        var fileUrl = await uploadFileAccessor.UpLoadFileOneAsync(request.Project.FilePDF, project.NameEN);
                        if (!string.IsNullOrEmpty(fileUrl)) project.PDF = fileUrl;
                    }

                    context.Entry(project).State = EntityState.Modified;

                    var result = await context.SaveChangesAsync() > 0;
                    if (!result) return Result<Unit>.Failure("Failed to updated project.");

                    return Result<Unit>.Success(Unit.Value);
                }
                else return Result<Unit>.Failure("You do not have the right to edit.");
            }
        }
    }
}
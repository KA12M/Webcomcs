using Application.Core;
using Application.Courses.DTOS;
using Application.interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Courses
{
    public class AddCourse
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CourseCreate Course { get; set; }
        }

        public class CommandValidator : AbstractValidator<CourseCreate>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Title).MaximumLength(90).NotEmpty();
                RuleFor(a => a.FileImages).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;
            private readonly IUploadFileAccessor uploadFileAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userManager, IUploadFileAccessor uploadFileAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var lecturer = await context.Users.FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());
                var role = await userManager.GetRolesAsync(lecturer);
                if (!role.Any(a => a.ToLower() == "lecturer")) return Result<Unit>.Failure("Permission denied");

                var newCourse = mapper.Map<Course>(request.Course);

                (string errorMessage, List<string> imgList) = await uploadFileAccessor.UpLoadImages(request.Course.FileImages);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);
                if (imgList.Count > 0) foreach (var img in imgList) newCourse.Photos.Add(new CoursePhoto { Url = img });

                newCourse.Photos.FirstOrDefault().IsMain = true; 
                newCourse.Lecturer = lecturer;

                context.Courses.Add(newCourse);
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem for create new course.");
            }
        }
    }
}
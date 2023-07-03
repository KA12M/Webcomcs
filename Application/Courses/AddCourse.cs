using System.Text.RegularExpressions;
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
                RuleFor(a => a.Photos).Must(a => a.Count() > 0).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IGenerationAccessor generationAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userManager, IUploadFileAccessor uploadFileAccessor, IGenerationAccessor generationAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
                this.uploadFileAccessor = uploadFileAccessor;
                this.generationAccessor = generationAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var lecturer = await context.Users.FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                var newCourse = mapper.Map<Course>(request.Course);

                newCourse.Id = generationAccessor.GenerateId("COURSE");

                newCourse.Photos.FirstOrDefault().IsMain = true;

                lecturer.Courses.Add(newCourse);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem for create new course.");
            }
        }
    }
}
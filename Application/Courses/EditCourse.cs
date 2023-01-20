
using Application.Core;
using Application.Courses.DTOS;
using Application.interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Courses
{
    public class EditCourse
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CourseUpdate Course { get; set; }
        }

        public class CommandValidator : AbstractValidator<CourseUpdate>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Id).NotEmpty(); 
                RuleFor(a => a.Title).MaximumLength(90).NotEmpty(); 
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            private readonly IUploadFileAccessor uploadFileAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, IUploadFileAccessor uploadFileAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(a => a.Courses) 
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());
                    
                var course = user.Courses.FirstOrDefault(a => a.Id == request.Course.Id);
                if (course == null) return null;

                (string errorMessage, List<string> imgList) = await uploadFileAccessor.UpLoadImages(request.Course.FileImages);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);

                mapper.Map<CourseUpdate, Course>(request.Course, course);
                if (imgList.Count > 0) foreach (var img in imgList) course.Photos.Add(new CoursePhoto { Url = img }); 
                if (!course.Photos.Any(a => a.IsMain)) course.Photos.FirstOrDefault().IsMain = true;
                
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem for edit course.");
            }
        }
    }
}

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
    public class AddGeneration
    {
        public class Command : IRequest<Result<Unit>>
        {
            public GenerationCreate Generation { get; set; }
        }

        public class CommandValidator : AbstractValidator<GenerationCreate>
        {
            public CommandValidator()
            {
                RuleFor(a => a.SubTitle).MaximumLength(90).NotEmpty();
                RuleFor(a => a.Quantity).NotEmpty().Must(a => a > 0);
                RuleFor(a => a).Must(x => x.EndDate == default(DateTime) || x.StartDate == default(DateTime) || x.EndDate > x.StartDate)
                    .WithMessage("EndTime must greater than StartTime");
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
                var lecturer = await context.Users
                    .Include(a => a.Courses)
                        .ThenInclude(a => a.Photos)
                    .Include(a => a.Courses)
                        .ThenInclude(a => a.Generations)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());
                var course = lecturer.Courses
                    .FirstOrDefault(a => a.Id == request.Generation.CourseId);
                if (course == null) return null;

                if (request.Generation.GenPhoto.IsNullOrEmpty()) request.Generation.GenPhoto = course.Photos.FirstOrDefault(a => a.IsMain).Url;

                var newGeneration = mapper.Map<Generation>(request.Generation); 

                newGeneration.Id = generationAccessor.GenerateId("GEN");

                course.Generations.Add(newGeneration);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem for create new generation of course.");
            } 
        }
    }
}
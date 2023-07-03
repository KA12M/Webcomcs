
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
    public class EditGeneration
    {
        public class Command : IRequest<Result<Unit>>
        { 
            public GenerationUpdate Generation { get; set; }
        }

        public class CommandValidator : AbstractValidator<GenerationUpdate>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Id).NotEmpty();
                RuleFor(a => a.Quantity).NotEmpty().Must(a => a > 0);
                RuleFor(a => a.SubTitle).MaximumLength(90).NotEmpty();
                RuleFor(a => a.GenPhoto).NotEmpty();
                RuleFor(a => a).Must(x => x.EndDate == default(DateTime) || x.StartDate == default(DateTime) || x.EndDate > x.StartDate)
                    .WithMessage("EndTime must greater than StartTime");
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUploadFileAccessor uploadFileAccessor, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.uploadFileAccessor = uploadFileAccessor;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var lecturer = await context.Users  
                    .Include(a => a.Courses)
                        .ThenInclude(a => a.Generations)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                var course = lecturer.Courses.FirstOrDefault(a => a.Id == request.Generation.CourseId);
                if (course == null) return null;
                
                var generationCurrent = course.Generations.FirstOrDefault(a => a.Id == request.Generation.Id);
                if (generationCurrent == null) return null; 
                
                mapper.Map<GenerationUpdate, Generation>(request.Generation, generationCurrent);

                context.Entry(generationCurrent).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem uploading.");
            }
        }
    }
}
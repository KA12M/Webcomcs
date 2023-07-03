

using Application.Core;
using Application.CourseComment.DTOS;
using Application.interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CourseComment
{
    public class Create
    {
        public class Command : IRequest<Result<CourseCommentDTO>>
        {
            public string Body { get; set; }
            public string GenerationId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CourseCommentDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<CourseCommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var generation = await context.Generations.FindAsync(request.GenerationId);
                if (generation == null) return null;

                var user = await context.Users
                    .SingleOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                var comment = new Domain.CourseComment
                {
                    Body = request.Body,
                    Author = user,
                    Generation = generation,
                };

                generation.Comments.Add(comment);

                var success = await context.SaveChangesAsync() > 0; 
                return success ? Result<CourseCommentDTO>.Success(mapper.Map<CourseCommentDTO>(comment)) : Result<CourseCommentDTO>.Failure("Failure to add comment");
            }
        }
    }
}
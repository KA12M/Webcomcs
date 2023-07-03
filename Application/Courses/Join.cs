
using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain;
using Domain.DTOS;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class Join
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string GenerationId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var generationCurrent = await context.Generations
                    .Include(a => a.Attendees)
                    .Include(a => a.Course)
                        .ThenInclude(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.GenerationId);
                if (generationCurrent == null) return null;

                if (generationCurrent.IsCancelled) return Result<Unit>.Failure("Course is cancelled.");

                var user = await context.Users
                    .Include(a => a.CourseAttendees)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                if (user.UserName == generationCurrent.Course.Lecturer.UserName) return Result<Unit>.Success(Unit.Value);

                var myAttendee = user.CourseAttendees.FirstOrDefault(a => a.GenerationId == request.GenerationId);
                if (myAttendee != null) user.CourseAttendees.Remove(myAttendee);
                else if (generationCurrent.Attendees.Count() >= generationCurrent.Quantity) Result<Unit>.Failure("The course is now fully subscribed.");
                else user.CourseAttendees.Add(new CourseAttendee { Generation = generationCurrent });

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Something went wrong joining.");
            }
        }
    }
}
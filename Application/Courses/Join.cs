
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
            public Guid CourseId { get; set; }
            public Guid GenerationId { get; set; }
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
                var courseCurrent = await context.Courses
                    .Include(a => a.Generations)
                    .Include(a => a.Lecturer)
                    .FirstOrDefaultAsync(a => a.Id == request.CourseId);
                var generationCurrent = courseCurrent.Generations.FirstOrDefault(a => a.Id == request.GenerationId);
                if (courseCurrent == null || generationCurrent == null) return null;
                if (generationCurrent.IsCancelled) return Result<Unit>.Failure("Course or Generation is cancelled.");

                var user = await context.Users
                    .Include(a => a.CourseAttendees)
                    .FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());
 
                var role = await userManager.GetRolesAsync(user);
                
                switch (generationCurrent.Permission)
                {
                    case CoursePermission.Student:
                        if (!role.Any(a => a.ToLower() == "student"))
                            return Result<Unit>.Failure("Permission problem occurred");
                        break;
                    default:
                        if (courseCurrent.Lecturer.UserName == user.UserName)
                            return Result<Unit>.Failure("Permission problem occurred");
                        break;
                }

                var myParticipant = user.CourseAttendees.FirstOrDefault(a => a.GenerationId == request.GenerationId);
                if (myParticipant != null) user.CourseAttendees.Remove(myParticipant);
                else user.CourseAttendees.Add(new CourseAttendee { Generation = generationCurrent });
                
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Something went wrong joining.");
            }
        }
    }
}
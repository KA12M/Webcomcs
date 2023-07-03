
using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Profile
    {
        public class Command : IRequest<Result<DTOS.Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<DTOS.Profile>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<DTOS.Profile>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(a => a.Student)
                    .Include(a => a.Lecturer) 
                    .Include(a => a.JobHistory) 
                    .FirstOrDefaultAsync(a => a.UserName == request.Username);
                if (user == null) return null;

                var profile = mapper.Map<DTOS.Profile>(user);
                if (!String.IsNullOrEmpty(userAccessor.GetUsername())) profile.IsMe = user.UserName == userAccessor.GetUsername();
                
                return Result<DTOS.Profile>.Success(profile);
            }
        }
    }
}
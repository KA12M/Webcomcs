

using Application.Core;
using Application.Projects.DTOS;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Detail
    {
        public class Command : IRequest<Result<ProjectDTO>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<ProjectDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<ProjectDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await context.Projects
                    .Include(a => a.Student)
                        .ThenInclude(a => a.Student)
                    .Include(a => a.Consultants)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);

                if (project == null) return null;
 
                return Result<ProjectDTO>.Success(mapper.Map<Project, ProjectDTO>(project));
            }
        }
    }
}
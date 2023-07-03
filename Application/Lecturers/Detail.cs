
using Application.Core;
using Application.Lecturers.DTOS;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Lecturers
{
    public class Detail
    {
        public class Query : IRequest<Result<LecturerDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<LecturerDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<LecturerDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await context.Lecturers 
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                if (query == null) return null;

                return Result<LecturerDTO>.Success(mapper.Map<LecturerDTO>(query));
            }
        }
    }
}


using Application.Core;
using Application.Syllabuses.DTOS;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Syllabuses
{
    public class Detail
    {
        public class Query : IRequest<Result<SyllabusDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<SyllabusDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<SyllabusDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await context.Syllabuses
                    .Include(a => a.Subjects)
                    .Where(x => x.IsUsed)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                if (query == null) return null; 

                return Result<SyllabusDTO>.Success(mapper.Map<SyllabusDTO>(query));
            }
        }
    }
}
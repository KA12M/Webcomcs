 
using Application.Core;
using Application.Lecturers.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Lecturers
{
    public class List
    {
        public class Query : IRequest<Result<List<LecturerDTO>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<LecturerDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<LecturerDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Lecturers
                    .Include(a => a.Prefix)
                    .ProjectTo<LecturerDTO>(mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<List<LecturerDTO>>.Success(await query.ToListAsync());
            }
        }
    }
}
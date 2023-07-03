
using Application.Core;
using Application.Syllabuses.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Syllabuses
{
    public class List
    {
        public class Query : IRequest<Result<List<SyllabusDTO>>>
        {
            public SyllabusParam Param { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<SyllabusDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<SyllabusDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Syllabuses
                    .Include(a => a.Subjects)
                    .Include(a => a.Objectives)
                    .Include(a => a.Occupations)
                    .Where(x => x.IsUsed)
                    .Where(a => request.Param.ShowHidden ? true : !a.Hidden)
                    .AsQueryable();

                return Result<List<SyllabusDTO>>.Success(await query.ProjectTo<SyllabusDTO>(mapper.ConfigurationProvider).ToListAsync());
            }
        }
    }
}
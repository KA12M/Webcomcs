
using Application.Core;
using Application.Lecturers.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Lecturers
{
    public class List
    {
        public class Query : IRequest<Result<List<LecturerDTO>>>
        {
            public LecturerParams Params { get; set; }
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
                    .Where(a => !request.Params.ShowHidden ? !a.Hidden : true)
                    .ProjectTo<LecturerDTO>(mapper.ConfigurationProvider)
                    .AsQueryable();

                if (!request.Params.Search.IsNullOrEmpty()) query = query.Where(a => a.FullName.Contains(request.Params.Search) || a.Position.Contains(request.Params.Search));
                
                if (!request.Params.Position.IsNullOrEmpty()) query = query.Where(a => a.Position == request.Params.Position);

                return Result<List<LecturerDTO>>.Success(await query.ToListAsync());
            }
        }
    }
}
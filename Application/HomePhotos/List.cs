

using Application.Core;
using Application.HomePhotos.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HomePhotos
{
    public class List
    {
        public class Query : IRequest<Result<List<HomePhotoDTO>>>
        {
            public bool EnableOnly { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<HomePhotoDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<HomePhotoDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.HomePhotos
                    .Where(a => a.IsUsed)
                    .ProjectTo<HomePhotoDTO>(mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.EnableOnly) query = query.Where(a => a.IsEnable);
                return Result<List<HomePhotoDTO>>.Success(await query.ToListAsync());
            }
        }
    }
}
using Application.Core;
using Application.News.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class Detail
    {
        public class Query : IRequest<Result<NewsDTO>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<NewsDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<NewsDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await context.Newses
                    .Include(a => a.Author)
                    .Include(a => a.NewsPhotos)
                    .ProjectTo<NewsDTO>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                if (query == null) return null;
                
                return Result<NewsDTO>.Success(query);
            }
        }
    }
}
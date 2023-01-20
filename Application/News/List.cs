using Application.Core;
using Application.interfaces;
using Application.News.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.News
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<NewsPreviewDTO>>>
        {
            public NewsParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<NewsPreviewDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<PagedList<NewsPreviewDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Newses
                    .Include(a => a.NewsPhotos)
                    .OrderByDescending(a => a.CreatedAt)
                    .AsQueryable();

                if (!request.Params.ShowAll) query = query.Where(a => !a.IsHidden);


                if (!request.Params.Search.IsNullOrEmpty())
                    query = query.Where(a => a.Title.Contains(request.Params.Search) || a.CreatedAt.ToString().Contains(request.Params.Search));

                var data = query.ProjectTo<NewsPreviewDTO>(mapper.ConfigurationProvider);
                return Result<PagedList<NewsPreviewDTO>>.Success(await PagedList<NewsPreviewDTO>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
            }
        }
    }
}
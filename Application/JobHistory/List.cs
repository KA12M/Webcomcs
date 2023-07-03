
using Application.Core;
using Application.JobHistory.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobHistory
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<JobHistoryUserDTO>>>
        {
            public JobHistoryParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<JobHistoryUserDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<PagedList<JobHistoryUserDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.JobHistories
                    .Include(a => a.User)
                    .Where(a => request.Params.ShowAll ? true : a.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .AsQueryable();

                var data = query.ProjectTo<JobHistoryUserDTO>(mapper.ConfigurationProvider);
                return Result<PagedList<JobHistoryUserDTO>>.Success(await PagedList<JobHistoryUserDTO>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
            }
        }
    }
}
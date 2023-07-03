
using Application.Core;
using Application.ReportApp.DTOS;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ReportApp
{
    public class JobHistoryByJobName
    {
        public class Query : IRequest<Result<List<JobHistoryByJobNameDTO>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<JobHistoryByJobNameDTO>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<JobHistoryByJobNameDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobHistories = await context.JobHistories
                            .Where(j => j.IsUsed)
                            .GroupBy(j => j.JobName)
                            .Select(g => new JobHistoryByJobNameDTO
                            {
                                JobName = g.Key,
                                Count = g.Count()
                            })
                            .ToListAsync(); 

                return Result<List<JobHistoryByJobNameDTO>>.Success(jobHistories);
            }
        }
    }
}
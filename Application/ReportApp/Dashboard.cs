
using Application.Core;
using Application.ReportApp.DTOS;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ReportApp
{
    public class Dashboard
    {
        public class Query : IRequest<Result<DashboardDTO>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<DashboardDTO>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<DashboardDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userNum = await context.Users.CountAsync(a => a.IsUsed);
                var jobHistoryNum = await context.JobHistories.CountAsync();
                var projectNum = await context.Projects.CountAsync();
                var newsNum = await context.Newses.CountAsync();

                var dashboard = new DashboardDTO
                {
                    UserNum = userNum,
                    ProjectNum = projectNum,
                    NewsNum = newsNum,
                    JobHistoryNum = jobHistoryNum
                };

                return Result<DashboardDTO>.Success(dashboard);
            }
        }
    }
}
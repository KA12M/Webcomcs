
using System.Net;
using Application.ReportApp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ReportController : BaseApiController
    {
        private readonly DataContext context;

        public ReportController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("dashboard")]
        public async Task<ActionResult> getDashboard()
        {
            return HandleResult(await Mediator.Send(new Dashboard.Query { }));
        }

        [AllowAnonymous]
        [HttpGet("jobHistoryByJobName")]
        public async Task<ActionResult> getJobByJobName()
        {
            return HandleResult(await Mediator.Send(new JobHistoryByJobName.Query { }));
        }

        [HttpGet("userCountByRole")]
        public async Task<ActionResult> getUserCountByRole()
        {
            var result = await context.Users
                            .GroupBy(u => u.IsRole)
                            .Select(g => new
                            {
                                Role = g.Key,
                                Count = g.Count()
                            })
                            .ToListAsync();

            return Ok(result);
        }
    }
}
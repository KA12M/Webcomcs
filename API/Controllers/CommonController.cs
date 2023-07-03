
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CommonController : BaseApiController
    {
        private readonly DataContext context;

        public CommonController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("jobNameList")]
        public async Task<ActionResult> getJobNameList()
        {
            var jobNames = await context.JobHistories
                           .Select(j => j.JobName)
                           .Distinct()
                           .ToListAsync();
            return Ok(jobNames);
        }
    }
}

using Application.JobHistory.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class JobHistoryController : BaseApiController
    {
        private readonly DataContext context;

        public JobHistoryController(DataContext context)
        {
            this.context = context;
        } 

        [HttpGet]
        public async Task<ActionResult> AllJobHistory([FromQuery] JobHistoryParams param)
        {
            return HandlePagedResult(await Mediator.Send(new Application.JobHistory.List.Query { Params = param }));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateJobHistory([FromBody] JobHistoryDTO data)
        {
            return HandleResult(await Mediator.Send(new Application.JobHistory.Edit.Command { JobHistory = data }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{username}")]
        public async Task<ActionResult> IsUsed([FromRoute] string username)
        {
            return HandleResult(await Mediator.Send(new Application.JobHistory.IsUse.Command { Username = username }));
        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> RemoveJobHistory()
        {
            return HandleResult(await Mediator.Send(new Application.JobHistory.Delete.Command { }));
        }
    }
}
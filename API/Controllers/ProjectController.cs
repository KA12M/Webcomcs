

using Application.Projects;
using Application.Projects.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetProjects([FromQuery] ProjectParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }
 
        [HttpGet("{id}")]
        public async Task<ActionResult> GetProject(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Command { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateProject([FromForm] ProjectCreate project)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Project = project }));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditProject([FromForm] ProjectEdit project)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Project = project }));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}
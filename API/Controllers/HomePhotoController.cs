
using Application.HomePhotos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HomePhotoController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetHomePhotos([FromQuery] bool enableOnly = true)
        {
            return HandleResult(await Mediator.Send(new List.Query { EnableOnly = enableOnly }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetHomePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddHomePhoto([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditHomePhoto([FromForm] Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [Authorize]
        [HttpPatch("{id}/enable")]
        public async Task<ActionResult> EditHomePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateEnable.Command { Id = id }));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHomePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
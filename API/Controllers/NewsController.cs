

using Application.News;
using Application.News.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NewsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetNews([FromQuery] NewsParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetNewsOne(string id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddNews([FromForm] NewsCreate news)
        {
            return HandleResult(await Mediator.Send(new Add.Command { News = news }));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditNews([FromForm] NewsUpdate news)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { News = news }));
        }

        [Authorize]
        [HttpPatch("{id}/setMain/{imageId}")]
        public async Task<ActionResult> SetMainPhoto(string id, Guid imageId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { Id = id, ImageId = imageId }));
        }

        [Authorize]
        [HttpPatch("{id}/hidden")]
        public async Task<ActionResult> SetHidden(string id)
        {
            return HandleResult(await Mediator.Send(new Hidden.Command { Id = id }));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews(string id)
        {
            return HandleResult(await Mediator.Send(new Remove.Command { Id = id }));
        }

        [Authorize]
        [HttpDelete("{id}/photo")]
        public async Task<ActionResult> DeletePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new RemovePhoto.Command { Id = id }));
        }
    }
}

using Application.ComSciSubject;
using Application.ComSciSubject.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ComSciSubjectController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getOne(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetOne.Query { Id = id }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> postCreate([FromBody] ComSciSubjectCreate subject)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ComSciSubject = subject }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> putUpdate([FromBody] ComSciSubjectUpdate subject)
        {
            return HandleResult(await Mediator.Send(new Update.Command { ComSciSubject = subject }));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Remove.Command { Id = id }));
        }
    }
}
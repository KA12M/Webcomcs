
using Application.Lecturers;
using Application.Lecturers.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LecturerController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetLecturers([FromQuery] LecturerParams query)
        {
            return HandleResult(await Mediator.Send(new List.Query { Params = query }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetLecturer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> AddLecturer([FromForm] LecturerCreate lecturer)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Lecturer = lecturer }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> EditLecturer([FromForm] LecturerUpdate lecturer)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Lecturer = lecturer }));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLecturer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/hidden")]
        public async Task<ActionResult> SetHidden(Guid id)
        {
            return HandleResult(await Mediator.Send(new Hidden.Command { Id = id }));
        }
    }
}

using Application.Lecturers;
using Application.Lecturers.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LecturerController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetLecturers()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetLecturer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddLecturer([FromForm] LecturerCreate lecturer)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Lecturer = lecturer }));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditLecturer([FromForm] LecturerUpdate lecturer)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Lecturer = lecturer }));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLecturer(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
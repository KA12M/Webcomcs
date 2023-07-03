
using Application.Syllabuses;
using Application.Syllabuses.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SyllabusController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetSyllabuses([FromQuery] SyllabusParam param)
        {
            return HandleResult(await Mediator.Send(new List.Query { Param = param }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSyllabus(string id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> AddSyllabus([FromBody] SyllabusCreate syllabus)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Syllabus = syllabus }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/hidden")]
        public async Task<ActionResult> SetHidden(string id)
        {
            return HandleResult(await Mediator.Send(new Hidden.Command { Id = id }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> EditSyllabus([FromBody] SyllabusUpdate syllabus)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Syllabus = syllabus }));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSyllabus(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
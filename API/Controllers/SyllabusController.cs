
using Application.Syllabuses;
using Application.Syllabuses.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SyllabusController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetSyllabuses()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSyllabus(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddSyllabus([FromBody] SyllabusCreate syllabus)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Syllabus = syllabus }));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> EditSyllabus([FromBody] SyllabusUpdate syllabus)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Syllabus = syllabus}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSyllabus(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
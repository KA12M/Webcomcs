
using Application.Courses;
using Application.Courses.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CourseController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> getCourses([FromQuery] CourseParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("generations")]
        public async Task<ActionResult> getGenerations([FromQuery] GenerationParams param)
        {
            return HandlePagedResult(await Mediator.Send(new ListGeneration.Query { Params = param }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getCourse(string id)
        {
            return HandleResult(await Mediator.Send(new DetailCourse.Query { Id = id }));
        }

        [HttpGet("{genId}/generation")]
        public async Task<ActionResult> getCourseGeneration(string genId)
        {
            return HandleResult(await Mediator.Send(new DetailGeneration.Query { Id = genId }));
        }

        [Authorize]
        [HttpPost("joinCourse/{generationId}")]
        public async Task<ActionResult> postJoin(string generationId)
        {
            return HandleResult(await Mediator.Send(new Join.Command { GenerationId = generationId }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpPost]
        public async Task<ActionResult> postAddCourse([FromBody] CourseCreate course)
        {
            return HandleResult(await Mediator.Send(new AddCourse.Command { Course = course }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpPost("AddGen")]
        public async Task<ActionResult> postAddGeneration([FromBody] GenerationCreate generation)
        {
            return HandleResult(await Mediator.Send(new AddGeneration.Command { Generation = generation }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpPut("editCourse")]
        public async Task<ActionResult> putEditCourse([FromBody] CourseUpdate course)
        {
            return HandleResult(await Mediator.Send(new EditCourse.Command { Course = course }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpPut("editGeneration")]
        public async Task<ActionResult> putEditGeneration([FromBody] GenerationUpdate generation)
        {
            return HandleResult(await Mediator.Send(new EditGeneration.Command { Generation = generation }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpPatch("{generationId}/cancel")]
        public async Task<ActionResult> patchCancelGeneration(string generationId)
        {
            return HandleResult(await Mediator.Send(new CancelGeneration.Command { GenerationId = generationId }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpDelete("{courseId}")]
        public async Task<ActionResult> deleteCourse(string courseId)
        {
            return HandleResult(await Mediator.Send(new DeleteCourse.Command { CourseId = courseId }));
        }

        [Authorize(Roles = "Lecturer, Admin")]
        [HttpDelete("{generationId}/removeGen")]
        public async Task<ActionResult> deleteGeneration(string generationId)
        {
            return HandleResult(await Mediator.Send(new DeleteGeneration.Command { GenerationId = generationId }));
        } 
    }
}
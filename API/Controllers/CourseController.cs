
using Application.Courses;
using Application.Courses.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CourseController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetCourses([FromQuery] CourseParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCourse(Guid id)
        {
            return HandleResult(await Mediator.Send(new DetailCourse.Query { Id = id }));
        }

        [HttpGet("{id}/generation/{generationId}")]
        public async Task<ActionResult> GetCourseGeneration(Guid id, Guid generationId)
        {
            return HandleResult(await Mediator.Send(new DetailGeneration.Query { Id = id, GenerationId = generationId }));
        }

        [Authorize]
        [HttpPost("{courseId}/joinCourse/{generationId}")]
        public async Task<ActionResult> Join(Guid courseId, Guid generationId)
        {
            return HandleResult(await Mediator.Send(new Join.Command { CourseId = courseId, GenerationId = generationId }));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddCourse([FromForm] CourseCreate course)
        {
            return HandleResult(await Mediator.Send(new AddCourse.Command { Course = course }));
        }

        [Authorize]
        [HttpPost("{id}/AddGen")]
        public async Task<ActionResult> AddGeneration([FromForm] GenerationCreate generation, [FromRoute] Guid id)
        {
            return HandleResult(await Mediator.Send(new AddGeneration.Command { CourseId = id, Generation = generation }));
        }

        [Authorize]
        [HttpPut("editCourse")]
        public async Task<ActionResult> EditCourse([FromForm] CourseUpdate course)
        {
            return HandleResult(await Mediator.Send(new EditCourse.Command { Course = course }));
        }

        [Authorize]
        [HttpPut("{courseId}/editGeneration")]
        public async Task<ActionResult> EditGeneration([FromForm] GenerationUpdate generation, [FromRoute] Guid courseId)
        {
            return HandleResult(await Mediator.Send(new EditGeneration.Command { Generation = generation, CourseId = courseId }));
        }

        [Authorize]
        [HttpPatch("{courseId}/cancel/{generationId}")]
        public async Task<ActionResult> CancelGeneration(Guid courseId, Guid generationId)
        {
            return HandleResult(await Mediator.Send(new CancelGeneration.Command { CourseId = courseId, GenerationId = generationId }));
        }

        [Authorize]
        [HttpDelete("{courseId}")]
        public async Task<ActionResult> DeleteCourse(Guid courseId)
        {
            return HandleResult(await Mediator.Send(new DeleteCourse.Command { CourseId = courseId }));
        }

        [Authorize]
        [HttpDelete("{courseId}/delete/{generationId}")]
        public async Task<ActionResult> DeleteGeneration(Guid courseId, Guid generationId)
        {
            return HandleResult(await Mediator.Send(new DeleteGeneration.Command { CourseId = courseId, GenerationId = generationId }));
        }
    }
}
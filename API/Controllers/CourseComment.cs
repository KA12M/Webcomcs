
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CourseComment : BaseApiController
    {
        private readonly DataContext context;

        public CourseComment(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("{generationId}/comment")]
        public async Task<ActionResult> getCommentByGenerationId(string generationId)
        {
            return HandleResult(await Mediator.Send(new Application.CourseComment.List.Query { GenerationId = generationId }));
        } 
    }
}
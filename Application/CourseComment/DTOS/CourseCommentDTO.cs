
using Domain.DTOS;

namespace Application.CourseComment.DTOS
{
    public class CourseCommentDTO
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }  
        public Personal Author { get; set; } 
    }
}
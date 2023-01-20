using Domain;
using Domain.DTOS;
using Microsoft.AspNetCore.Http;

namespace Application.Courses.DTOS
{
    public class CourseCreate
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFileCollection FileImages { get; set; }
    }

    public class CourseUpdate
    {
        public Guid Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }  
        public ICollection<CoursePhoto> Photos { get; set; } = new List<CoursePhoto>();
        public IFormFileCollection FileImages { get; set; }  
    }
}
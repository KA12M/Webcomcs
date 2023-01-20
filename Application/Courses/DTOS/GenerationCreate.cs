
using Domain.DTOS;
using Microsoft.AspNetCore.Http;

namespace Application.Courses.DTOS
{
    public class GenerationCreate
    {  
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; } = DateTime.Now.AddDays(7);
        public CoursePermission Permission { get; set; }  
        public IFormFileCollection FileImages { get; set; }
    }

    public class GenerationUpdate : GenerationCreate
    {  
        public Guid Id { get; set; } 
    }
}
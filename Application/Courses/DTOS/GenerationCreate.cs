 
namespace Application.Courses.DTOS
{
    public class GenerationCreate
    {  
        public string CourseId { get; set; }
        
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; } = DateTime.Now.AddDays(7); 
        public string GenPhoto { get; set; }
        public int Quantity { get; set; } 
    }

    public class GenerationUpdate : GenerationCreate
    {  
        public string Id { get; set; } 
    }
}
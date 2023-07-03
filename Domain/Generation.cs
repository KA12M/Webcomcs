  
namespace Domain
{
    public class Generation
    {
        public string Id { get; set; }  
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string GenPhoto { get; set; }
        public int Quantity { get; set; } = 1; 
        public bool IsCancelled { get; set; } = false; 
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Course Course { get; set; }
        public ICollection<CourseAttendee> Attendees { get; set; } = new List<CourseAttendee>();
        public ICollection<CourseComment> Comments { get; set; } = new List<CourseComment>();
    }
}
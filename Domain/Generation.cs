
using Domain.DTOS;

namespace Domain
{
    public class Generation
    {
        public Guid Id { get; set; } = new Guid();
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string GenPhoto { get; set; }
        public int Quantity { get; set; } = 1;
        public CoursePermission Permission { get; set; } = CoursePermission.Everyone;
        public bool IsCancelled { get; set; } = false; 
        public ICollection<CourseAttendee> Attendees { get; set; } = new List<CourseAttendee>();
    }
}
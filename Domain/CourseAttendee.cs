
namespace Domain
{
    public class CourseAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public Guid GenerationId { get; set; }
        public Generation Generation { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
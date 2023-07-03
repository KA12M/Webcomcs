
namespace Domain
{
    public class CourseComment
    {
        public Guid Id { get; set; } = new Guid();
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public AppUser Author { get; set; }
        public Generation Generation { get; set; } 
    } 
}
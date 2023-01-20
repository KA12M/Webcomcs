 
namespace Domain
{
    public class CoursePhoto
    {
        public Guid Id { get; set; } = new Guid();
        public string Url { get; set; }
        public bool IsMain { get; set; } = false;
    }
}
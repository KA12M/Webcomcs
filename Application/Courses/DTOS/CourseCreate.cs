using Domain;

namespace Application.Courses.DTOS
{
    public class CourseCreate
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<CoursePhoto> Photos { get; set; } = new List<CoursePhoto>();
    }

    public class CourseUpdate : CourseCreate
    {
        public string Id { get; set; }
    }
}
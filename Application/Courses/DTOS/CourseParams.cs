using Application.Core;

namespace Application.Courses.DTOS
{
    public class CourseParams : PagingParams
    {
        public string HostUsername { get; set; }
        public bool MyCourse { get; set; } = false;
    }

    public class GenerationParams : PagingParams
    {
        public bool MyCourse { get; set; } = false;

    }
}
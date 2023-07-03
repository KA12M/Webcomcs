
using Domain.DTOS;

namespace Application.Courses.DTOS
{
    public class GenerationDTO
    {
        public string Id { get; set; }
        public string SubTitle { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string GenPhoto { get; set; }
        public bool IsCancelled { get; set; } = false;
        public int AttendeeCount { get; set; }
    }

    public class GenerationList : GenerationDTO
    {
        public CoursePreview Course { get; set; }
        public ICollection<AttendeeDTO> PreviewAttendees { get; set; }
        public bool IsHost { get; set; } = false;
    }

    public class CourseGenerationDetail
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public bool IsHost { get; set; } = false;
        public Personal Lecturer { get; set; }
        public GenerationDetail Generation { get; set; }
    }

    public class GenerationDetail
    {
        public string Id { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string GenPhoto { get; set; }
        public bool IsCancelled { get; set; } = false;
        public ICollection<AttendeeDTO> Attendees { get; set; }
    }
}
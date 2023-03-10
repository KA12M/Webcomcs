
using Domain;
using Domain.DTOS;

namespace Application.Courses.DTOS
{
    public class CourseDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool IsUsed { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
        public Personal Lecturer { get; set; }
        public ICollection<GenerationDTO> Generations { get; set; }
    }

    public class CourseDetail
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; } 
        public Personal Lecturer { get; set; }
        public ICollection<CoursePhoto> Photos { get; set; }
        public ICollection<GenerationDTO> Generations { get; set; }
    }
}
namespace Domain
{
    public class Course
    {
        public string Id { get; set; }  
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsUsed { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now; 
        public ICollection<CoursePhoto> Photos { get; set; } = new List<CoursePhoto>();
        public ICollection<Generation> Generations { get; set; } = new List<Generation>();
        public AppUser Lecturer { get; set; }
    }
}
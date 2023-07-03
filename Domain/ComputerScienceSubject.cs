
namespace Domain
{
    public class ComputerScienceSubject
    {
        public Guid Id { get; set; } = new Guid();
        public string Icon { get; set; }
        public string SubjectName { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<ComputerScienceImage> Photos { get; set; } = new List<ComputerScienceImage>();
    }
}
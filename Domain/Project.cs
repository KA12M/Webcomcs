 
namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; } = new Guid();
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string PDF { get; set; }
        public string VideoUrl { get; set; }
        public string WebUrl { get; set; }
        public string GithubUrl { get; set; }
        public ICollection<Consultant> Consultants { get; set; }
        public bool IsUsed { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public AppUser Student { get; set; }
    }
}
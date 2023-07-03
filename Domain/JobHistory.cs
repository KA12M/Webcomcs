
namespace Domain
{
    public class JobHistory
    {
        public string Id { get; set; }
        public string JobName { get; set; }
        public string Position { get; set; }
        public DateTime Date { get; set; }
        public string Company { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsUsed { get; set; } = true;

        public AppUser User { get; set; }
    }
}
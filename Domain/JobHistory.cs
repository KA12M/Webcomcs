
namespace Domain
{
    public class JobHistory
    {
        public string Id { get; set; }
        public string JobName { get; set; }
        public string Position { get; set; }
        public int Year { get; set; }
        public string Company { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now; 
    }
}
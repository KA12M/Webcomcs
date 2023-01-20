  
namespace Domain.Others
{
    public class HomePhoto
    {
        public Guid Id { get; set; } = new Guid();    
        public string Title { get; set; } 
        public string Url { get; set; }
        public bool IsEnable { get; set; } = true;
        public bool IsUsed { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
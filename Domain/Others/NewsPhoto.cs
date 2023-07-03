
namespace Domain.Others
{
    public class NewsPhoto
    {
        public Guid Id { get; set; } = new Guid();
        public string Url { get; set; }
        public bool IsMain { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
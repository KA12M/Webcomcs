
namespace Domain.Others
{
    public class News
    {
        public Guid Id { get; set; } = new Guid();
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Body { get; set; }
        public bool IsHidden { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<NewsPhoto> NewsPhotos { get; set; } = new List<NewsPhoto>();
        public AppUser Author { get; set; }
    }
}
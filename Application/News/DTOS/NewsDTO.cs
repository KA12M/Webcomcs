
using Domain.DTOS;
using Domain.Others;

namespace Application.News.DTOS
{
    public class NewsDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Body { get; set; }
        public bool IsHidden { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<NewsPhoto> NewsPhotos { get; set; }
        public string MainImage { get; set; }
        public Personal Author { get; set; }
    }

    public class NewsPreviewDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public bool IsHidden { get; set; }
        public DateTime CreatedAt { get; set; }
        public string MainImage { get; set; }
    }
}
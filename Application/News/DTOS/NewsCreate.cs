
using Domain.Others;
using Microsoft.AspNetCore.Http;

namespace Application.News.DTOS
{
    public class NewsCreate
    { 
        public string Title { get; set; } 
        public string SubTitle { get; set; }
        public string Body { get; set; }  
        public IFormFileCollection FileImages { get; set; }
    }

    public class NewsUpdate : NewsCreate
    {
        public string Id { get; set; }
        public ICollection<NewsPhoto> NewsPhotos { get; set; } = new List<NewsPhoto>();
    }
}
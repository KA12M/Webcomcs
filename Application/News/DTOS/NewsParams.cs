
using Application.Core;

namespace Application.News.DTOS
{
    public class NewsParams : PagingParams
    {
        public bool ShowAll { get; set; } = false;
    }
}
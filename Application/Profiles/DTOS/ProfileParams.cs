using Application.Core;
using Domain.DTOS;

namespace Application.Profiles.DTOS
{
    public class ProfileParams : PagingParams
    {
        public string Role { get; set; }
        public DateTime Year { get; set; } = DateTime.Now;
    }
}
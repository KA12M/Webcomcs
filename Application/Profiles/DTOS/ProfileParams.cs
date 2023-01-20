using Application.Core;

namespace Application.Profiles.DTOS
{
    public class ProfileParams : PagingParams
    {
        public string Role { get; set; } = "All"; 
        public DateTime Year { get; set; } = DateTime.Now;
    }
}
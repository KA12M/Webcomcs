 

namespace Application.HomePhotos.DTOS
{
    public class HomePhotoDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Url { get; set; }
        public bool IsEnable { get; set; }
    }
}
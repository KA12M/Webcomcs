
namespace Application.Lecturers.DTOS
{
    public class LecturerParams
    {
        public bool ShowHidden { get; set; } = false;
        public string Search { get; set; }
        public string Position { get; set; }
    }
}
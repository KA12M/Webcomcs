  
namespace Application.Lecturers.DTOS
{
    public class LecturerDTO
    {
        public Guid Id { get; set; }        
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Image { get; set; }
        public string Prefixed { get; set; }
    }
}
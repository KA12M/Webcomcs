
using Microsoft.AspNetCore.Http;

namespace Application.Lecturers.DTOS
{
    public class LecturerCreate
    { 
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Prefix { get; set; }
        public string Expert { get; set; }
        public IFormFileCollection FileImage { get; set; }
    }

    public class LecturerUpdate : LecturerCreate
    {
        public Guid Id { get; set; }
    }
}
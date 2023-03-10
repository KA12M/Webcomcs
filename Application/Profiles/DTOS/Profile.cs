 
using Domain.DTOS;
using Microsoft.AspNetCore.Identity;

namespace Application.Profiles.DTOS
{
    public class Profile
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }  
        public UserRole IsRole { get; set; }  
        
        public Student Student { get; set; }
        public Lecturer Lecturer { get; set; }
    }
}
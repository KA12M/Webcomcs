using Domain.DTOS;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public UserRole IsRole { get; set; } = UserRole.Guest;
        public bool IsUsed { get; set; } = true;
        public bool Hidden { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public UserStudent Student { get; set; }
        public UserLecturer Lecturer { get; set; }
        public ICollection<Project> Projects { get; set; }
        public JobHistory JobHistory { get; set; }
        public ICollection<Course> Courses { get; set; } = new List<Course>();
        public ICollection<CourseAttendee> CourseAttendees { get; set; } = new List<CourseAttendee>(); 
        public ICollection<CourseComment> CourseComments { get; set; } = new List<CourseComment>(); 
    }
}
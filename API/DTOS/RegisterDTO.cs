
using System.ComponentModel.DataAnnotations;
using Domain.DTOS;

namespace API.DTOS
{
    public class RegisterDTO
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6, ErrorMessage = "รหัสผ่านอย่างน้อย 6 ตัวอักษร")]
        public string Password { get; set; }

        public string Username { get; set; }
        public UserRole Role { get; set; } = UserRole.Guest;
    }
}
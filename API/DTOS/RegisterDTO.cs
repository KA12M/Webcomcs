
using System.ComponentModel.DataAnnotations;

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
        [MinLength(8, ErrorMessage = "รหัสผ่านอย่างน้อย 8 ตัวอักษร")] 
        public string Password { get; set; }
        
        public string Username { get; set; }
        public string Role { get; set; } = "Guest";
    }
}
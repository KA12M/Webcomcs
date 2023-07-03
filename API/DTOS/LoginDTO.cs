
using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required] 
        [MinLength(6, ErrorMessage = "รหัสผ่านอย่างน้อย 6 ตัวอักษร")] 
        public string Password { get; set; }
    }
}
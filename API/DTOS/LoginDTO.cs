
using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required] 
        [MinLength(8, ErrorMessage = "รหัสผ่านอย่างน้อย 8 ตัวอักษร")] 
        public string Password { get; set; }
    }
}
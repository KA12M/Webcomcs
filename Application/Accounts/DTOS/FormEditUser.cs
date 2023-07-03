
using Domain.DTOS;

namespace Application.Accounts.DTOS
{
    public class FormEditUser
    {
        public string CurrentUsername { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
    }
}
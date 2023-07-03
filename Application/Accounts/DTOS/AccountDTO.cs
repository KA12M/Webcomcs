

using Domain.DTOS;
using Microsoft.AspNetCore.Http;

namespace Application.Accounts.DTOS
{
    public class AccountDTO
    {

    }

    public class AccountUpdate
    { 
        public string FullName { get; set; }
        public string Bio { get; set; }

        public Student Student { get; set; }
        public Lecturer Lecturer { get; set; }
        public IFormFileCollection FileImages { get; set; }
    }
}
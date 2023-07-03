
using Domain.DTOS;

namespace Application.JobHistory.DTOS
{
    public class JobHistoryDTO
    { 
        public string JobName { get; set; }
        public string Position { get; set; }
        public DateTime Date { get; set; }
        public string Company { get; set; }
        public string Description { get; set; } 
    }

    public class JobHistoryUserDTO : JobHistoryDTO
    { 
        public Personal User { get; set; }
        public DateTime Created { get; set; }  
        public bool IsUse { get; set; } = true;
    }
}
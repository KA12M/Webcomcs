
using Domain.DTOS;

namespace Domain.Others
{
    public class Subject
    { 
        public Guid Id { get; set; } = new Guid();    
        public string Name { get; set; }
        public float Credit { get; set; } 
        public SubjectCategory SubjectCategory { get; set; }
    }
}
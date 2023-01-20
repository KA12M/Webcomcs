 
namespace Domain.Others
{
    public class Syllabus
    {
        public Guid Id { get; set; } = new Guid();     
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public int Year { get; set; }
        public string DegreeTH { get; set; }
        public string DegreeEN { get; set; } 
        public bool IsUsed { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Subject> Subjects { get; set; }
    }
}
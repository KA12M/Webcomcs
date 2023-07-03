 
namespace Domain.Others
{
    public class Syllabus
    {
        public string Id { get; set; }  
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Year { get; set; }
        public string DegreeTH { get; set; }
        public string DegreeEN { get; set; } 
        public string PDF { get; set; } 
        public bool IsUsed { get; set; } = true;
        public bool Hidden { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Objective> Objectives { get; set; } = new List<Objective>();
        public ICollection<Occupation> Occupations { get; set; } = new List<Occupation>();
        public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
    }
}
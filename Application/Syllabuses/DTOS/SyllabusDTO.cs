
namespace Application.Syllabuses.DTOS
{
    public class SyllabusDTO
    {
        public Guid Id { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public int Year { get; set; }
        public string DegreeTH { get; set; }
        public string DegreeEN { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<SubjectDTO> Subjects { get; set; }

        public float Total { get; set; }
        public float Avg { get; set; }
    }

    public class SubjectDTO
    {
        public string Name { get; set; }
        public float Credit { get; set; }
    }
}
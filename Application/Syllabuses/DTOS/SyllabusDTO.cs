
using Domain.DTOS;
using Domain.Others;

namespace Application.Syllabuses.DTOS
{
    public class SyllabusDTO
    {
        public string Id { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Year { get; set; }
        public string DegreeTH { get; set; }
        public string DegreeEN { get; set; }
        public string PDF { get; set; }
        public ICollection<SubjectDTO> SubjectGeneral { get; set; }
        public ICollection<SubjectDTO> SubjectSpecific { get; set; }
        public ICollection<SubjectDTO> SubjectFreeElective { get; set; }
        public ICollection<string> Objective { get; set; }
        public ICollection<string> Occupation { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool Hidden { get; set; }

        public float Total { get; set; }
        public float Avg { get; set; }
    }


    public class SubjectDTO
    {
        public string Name { get; set; }
        public float Credit { get; set; }
    }

    public class SyllabusDetail : SyllabusDTO
    {
        public new ICollection<Subject> SubjectGeneral { get; set; }
        public new ICollection<Subject> SubjectSpecific { get; set; }
        public new ICollection<Subject> SubjectFreeElective { get; set; }
        public new ICollection<Objective> Objective { get; set; }
        public new ICollection<Occupation> Occupation { get; set; }
    }
}
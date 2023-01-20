
namespace Application.Syllabuses.DTOS
{
    public class SyllabusCreate
    {
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public int Year { get; set; }
        public string DegreeTH { get; set; }
        public string DegreeEN { get; set; }
        public ICollection<SubjectCreate> Subjects { get; set; }
    }  

    public class SubjectCreate
    {
        public string Name { get; set; }
        public float Credit { get; set; }
    }

     public class SyllabusUpdate : SyllabusCreate
    {
        public Guid Id { get; set; }
    }
}
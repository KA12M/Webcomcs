 
using Domain.Others; 

namespace Application.Syllabuses.DTOS
{
    public class SyllabusCreate
    {
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Year { get; set; }
        public string DegreeTH { get; set; }
        public string DegreeEN { get; set; }
        public string PDF { get; set; }
        public ICollection<Subject> Subjects { get; set; }
        public ICollection<Objective> Objectives { get; set; }  
        public ICollection<Occupation> Occupations { get; set; }  
    } 

    public class SyllabusUpdate : SyllabusCreate
    {
        public string Id { get; set; } 
    } 
}
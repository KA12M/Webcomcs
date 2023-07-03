
using Domain;

namespace Application.ComSciSubject.DTOS
{
    public class ComSciSubjectCreate
    {
        public string Icon { get; set; }
        public string SubjectName { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public ICollection<ComputerScienceImage> Photos { get; set; } = new List<ComputerScienceImage>();
    }

    public class ComSciSubjectUpdate : ComSciSubjectCreate
    {
        public Guid Id { get; set; }
    }
    
    public class ComSciSubjectPreview
    {
        public Guid Id { get; set; }
        public string Icon { get; set; }
        public string SubjectName { get; set; }
        public string SubTitle { get; set; }
    }
}
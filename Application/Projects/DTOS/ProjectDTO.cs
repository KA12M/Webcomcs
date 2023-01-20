 
using Domain;
using Domain.DTOS;

namespace Application.Projects.DTOS
{
    public class ProjectDTO
    {
        public Guid Id { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string PDF { get; set; }
        public string VideoUrl { get; set; }
        public string WebUrl { get; set; }
        public string GithubUrl { get; set; }
        public ICollection<Consultant> Consultants { get; set; } 
        public Personal Student { get; set; }
    }
}
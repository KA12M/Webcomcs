
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Projects.DTOS
{
    public class ProjectCreate
    { 
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Description { get; set; } 
        public string VideoUrl { get; set; }
        public string WebUrl { get; set; }
        public string GithubUrl { get; set; }
        public ICollection<Consultant> Consultants { get; set; } 

        public IFormFileCollection FileImage { get; set; } 
        public IFormFileCollection FilePDF { get; set; } 
    }
}
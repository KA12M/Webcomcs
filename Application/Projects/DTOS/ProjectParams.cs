 
using Application.Core;

namespace Application.Projects.DTOS
{
    public class ProjectParams : PagingParams
    {
        public bool ShowHidden { get; set; } = false; 
        public string Year { get; set; }
    }
}
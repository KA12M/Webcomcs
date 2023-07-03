
using Microsoft.AspNetCore.Http;

namespace Application.SystemSettings.DTOS
{
    public class SystemSettingDTO
    {
        public string WebName { get; set; }
        public string RegisterUrl { get; set; }
        public string KruUrl { get; set; }
        public string Logo { get; set; } 
        public string VideoUrl { get; set; } 
        public string Location { get; set; }
        public string PageFacebook { get; set; }  
    }

    public class SystemSettingUpdate
    {
        public string WebName { get; set; }
        public string RegisterUrl { get; set; }
        public string KruUrl { get; set; } 
        public string VideoUrl { get; set; } 
        public string Location { get; set; }
        public string PageFacebook { get; set; }  
        public IFormFileCollection FileImages { get; set; }
    }
}

using Microsoft.AspNetCore.Http;

namespace Application.SystemSettings.DTOS
{
    public class SystemSettingDTO
    {
        public string RegisterUrl { get; set; }
        public string KruUrl { get; set; }
        public string Logo { get; set; } 
    }

    public class SystemSettingUpdate
    {
        public string RegisterUrl { get; set; }
        public string KruUrl { get; set; } 
        public IFormFileCollection FileImages { get; set; }
    }
}
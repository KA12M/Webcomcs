
namespace Domain.Others
{
    public class SystemSetting
    {
        public Guid Id { get; set; } = new Guid();        
        public string RegisterUrl { get; set; } = "";
        public string KruUrl { get; set; } = "";
        public string Logo { get; set; }  
    }
}
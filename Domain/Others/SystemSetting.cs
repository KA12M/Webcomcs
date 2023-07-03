
namespace Domain.Others
{
    public class SystemSetting
    {
        public Guid Id { get; set; } = new Guid();
        public string WebName { get; set; } = "";
        public string RegisterUrl { get; set; } = "";
        public string KruUrl { get; set; } = "";
        public string PageFacebook { get; set; } = "";
        public string Logo { get; set; }
        public string VideoUrl { get; set; }
        public string Location { get; set; }
    }
}
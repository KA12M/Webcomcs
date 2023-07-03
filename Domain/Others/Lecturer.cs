namespace Domain.Others
{
    public class Lecturer
    {
        public Guid Id { get; set; } = new Guid();
        public string FullName { get; set; }
        public string Prefix { get; set; }
        public string Position { get; set; }
        public string Image { get; set; } = "user-default.jpg";
        public string Expert { get; set; }
        public bool Hidden { get; set; } = false;
        public DateTime CreatedAt { get; set; } = new DateTime();
    }
}
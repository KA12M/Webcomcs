namespace Domain.Others
{
    public class Lecturer
    {
        public Guid Id { get; set; } = new Guid(); 
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Image { get; set; }
        public Prefix Prefix { get; set; }
    }
}
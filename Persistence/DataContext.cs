using Domain;
using Domain.Others;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Consultant> Consultants { get; set; }
        public DbSet<HomePhoto> HomePhotos { get; set; }
        public DbSet<SystemSetting> SystemSettings { get; set; }
        public DbSet<Syllabus> Syllabuses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<News> Newses { get; set; }
        public DbSet<NewsPhoto> NewsPhotos { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }
        public DbSet<Prefix> Prefixes { get; set; }
        public DbSet<JobHistory> JobHistories { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CoursePhoto> CoursePhoto { get; set; }
        public DbSet<Generation> Generations { get; set; }
        public DbSet<CourseAttendee> CourseAttendees { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>().HasData(
                new Role { Id = "1", Name = "Guest", NormalizedName = "GUEST" },
                new Role { Id = "2", Name = "Student", NormalizedName = "STUDENT" },
                new Role { Id = "3", Name = "Lecturer", NormalizedName = "LECTURER" },
                new Role { Id = "4", Name = "Admin", NormalizedName = "ADMIN" });

            builder.Entity<AppUser>(a =>
            {
                a.HasOne(a => a.Student).WithOne().HasForeignKey<UserStudent>(a => a.Id).OnDelete(DeleteBehavior.Cascade);
                a.HasOne(a => a.Lecturer).WithOne().HasForeignKey<UserLecturer>(a => a.Id).OnDelete(DeleteBehavior.Cascade);
                a.HasOne(a => a.JobHistory).WithOne().HasForeignKey<JobHistory>(a => a.Id).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Project>().HasOne(a => a.Student).WithMany(a => a.Projects).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Project>().HasMany(a => a.Consultants).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Syllabus>().HasMany(a => a.Subjects).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<News>().HasMany(a => a.NewsPhotos).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Course>().HasMany(a => a.Photos).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Course>().HasMany(a => a.Generations).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Course>().HasOne(a => a.Lecturer).WithMany(a => a.Courses).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<CourseAttendee>(a => a.HasKey(aa => new { aa.AppUserId, aa.GenerationId }));

            builder.Entity<CourseAttendee>().HasOne(a => a.AppUser).WithMany(a => a.CourseAttendees).HasForeignKey(a => a.AppUserId).OnDelete(DeleteBehavior.ClientCascade); 
            builder.Entity<CourseAttendee>().HasOne(a => a.Generation).WithMany(a => a.Attendees).HasForeignKey(a => a.GenerationId).OnDelete(DeleteBehavior.ClientCascade); 
        }
    }
}
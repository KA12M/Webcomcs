
using Domain;
using Domain.DTOS;
using Domain.Others;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManage)
        {
            if (!context.SystemSettings.Any()) await context.SystemSettings.AddAsync(new SystemSetting { WebName = "วิทยาการคอมพิวเตอร์", Logo = "kru.png", Location = "14.06043606899306,99.42723508140298" });
            if (!userManage.Users.Any())
            {
                // var guest = new AppUser { FullName = "Mai", UserName = "mai", Email = "mai@test.com", IsRole = UserRole.Guest };
                // await userManage.CreateAsync(guest, "Pa$$w0rd");
                // await userManage.AddToRoleAsync(guest, "Guest");

                // var student1 = new AppUser { FullName = "Bob", UserName = "bob", Email = "bob@test.com", IsRole = UserRole.Student };
                // var student2 = new AppUser { FullName = "Karm", UserName = "karm", Email = "karm@test.com", IsRole = UserRole.Student };
                // await userManage.CreateAsync(student1, "Pa$$w0rd");
                // await userManage.CreateAsync(student2, "Pa$$w0rd");
                // await userManage.AddToRoleAsync(student2, "Student");
                // await userManage.AddToRoleAsync(student2, "Student");

                // var lecturer = new AppUser { FullName = "Tom", UserName = "tom", Email = "tom@test.com", IsRole = UserRole.Lecturer };
                // await userManage.CreateAsync(lecturer, "Pa$$w0rd");
                // await userManage.AddToRoleAsync(lecturer, "Lecturer");

                var admin = new AppUser { FullName = "Administrator", UserName = "admin", Email = "admin@test.com", IsRole = UserRole.Admin };
                await userManage.CreateAsync(admin, "Pa$$w0rd");
                await userManage.AddToRolesAsync(admin, new[] { "Admin", "Lecturer" });
            }
            await context.SaveChangesAsync();
        }
    }
}
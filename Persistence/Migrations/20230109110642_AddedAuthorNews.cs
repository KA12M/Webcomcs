using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedAuthorNews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7befe5a6-0a48-440e-886e-fe1e9c1e57a8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9154532d-e188-4878-896f-2847e3666811");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e6c5a1af-75a0-4c5a-9b8c-2d19104d2646");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f614b196-5278-45a2-88ec-ca7cd94d9c3e");

            migrationBuilder.AddColumn<string>(
                name: "AuthorId",
                table: "Newses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", null, "Role", "Guest", "GUEST" },
                    { "2", null, "Role", "Student", "STUDENT" },
                    { "3", null, "Role", "Lecturer", "LECTURER" },
                    { "4", null, "Role", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Newses_AuthorId",
                table: "Newses",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Newses_AspNetUsers_AuthorId",
                table: "Newses",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Newses_AspNetUsers_AuthorId",
                table: "Newses");

            migrationBuilder.DropIndex(
                name: "IX_Newses_AuthorId",
                table: "Newses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Newses");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7befe5a6-0a48-440e-886e-fe1e9c1e57a8", null, "Role", "Admin", "ADMIN" },
                    { "9154532d-e188-4878-896f-2847e3666811", null, "Role", "Lecturer", "LECTURER" },
                    { "e6c5a1af-75a0-4c5a-9b8c-2d19104d2646", null, "Role", "Student", "STUDENT" },
                    { "f614b196-5278-45a2-88ec-ca7cd94d9c3e", null, "Role", "Guest", "GUEST" }
                });
        }
    }
}

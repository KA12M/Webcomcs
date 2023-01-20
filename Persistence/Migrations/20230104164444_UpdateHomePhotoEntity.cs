using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateHomePhotoEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "11f34796-78df-4350-9e7e-78c48ddee326");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2237f2a9-c097-44ff-809b-8f784e0fde02");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "39cd695e-547f-4066-a80d-0b3b88f05701");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48eb56ab-18ae-4fc7-bff3-c9a8837ce4fe");

            migrationBuilder.DropColumn(
                name: "SubTitle",
                table: "HomePhotos");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "HomePhotos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "HomePhotos");

            migrationBuilder.AddColumn<string>(
                name: "SubTitle",
                table: "HomePhotos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "11f34796-78df-4350-9e7e-78c48ddee326", null, "Role", "Admin", "ADMIN" },
                    { "2237f2a9-c097-44ff-809b-8f784e0fde02", null, "Role", "Student", "STUDENT" },
                    { "39cd695e-547f-4066-a80d-0b3b88f05701", null, "Role", "Lecturer", "LECTURER" },
                    { "48eb56ab-18ae-4fc7-bff3-c9a8837ce4fe", null, "Role", "Guest", "GUEST" }
                });
        }
    }
}

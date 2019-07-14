using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class ChangedClassModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClassName",
                table: "Classes",
                newName: "Subject");

            migrationBuilder.AddColumn<string>(
                name: "Grade",
                table: "Classes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "Classes",
                newName: "ClassName");
        }
    }
}

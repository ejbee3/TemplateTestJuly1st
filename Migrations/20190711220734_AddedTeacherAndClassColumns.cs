using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class AddedTeacherAndClassColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "Teachers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "Teachers",
                nullable: true);
        }
    }
}

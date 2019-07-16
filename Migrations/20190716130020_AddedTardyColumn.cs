using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class AddedTardyColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Students");

            migrationBuilder.AddColumn<bool>(
                name: "IsTardy",
                table: "StudentCheckIns",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTardy",
                table: "StudentCheckIns");

            migrationBuilder.AddColumn<string>(
                name: "Grade",
                table: "Students",
                nullable: true);
        }
    }
}

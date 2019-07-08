using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class ChangedStudentCheckIn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentCheckIns_Students_StudentId",
                table: "StudentCheckIns");

            migrationBuilder.DropColumn(
                name: "StudenId",
                table: "StudentCheckIns");

            migrationBuilder.RenameColumn(
                name: "When",
                table: "StudentCheckIns",
                newName: "TimeCheckedIn");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "StudentCheckIns",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCheckIns_Students_StudentId",
                table: "StudentCheckIns",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentCheckIns_Students_StudentId",
                table: "StudentCheckIns");

            migrationBuilder.RenameColumn(
                name: "TimeCheckedIn",
                table: "StudentCheckIns",
                newName: "When");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "StudentCheckIns",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "StudenId",
                table: "StudentCheckIns",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCheckIns_Students_StudentId",
                table: "StudentCheckIns",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

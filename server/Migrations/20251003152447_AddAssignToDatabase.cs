using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProcrastiMate.Migrations
{
    /// <inheritdoc />
    public partial class AddAssignToDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedBy",
                table: "TaskItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedTo",
                table: "TaskItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedBy",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "AssignedTo",
                table: "TaskItems");
        }
    }
}

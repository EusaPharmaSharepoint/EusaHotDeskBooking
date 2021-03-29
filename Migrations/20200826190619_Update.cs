using Microsoft.EntityFrameworkCore.Migrations;

namespace EusaHotDeskBooking.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Isbooked",
                table: "DeskLocations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Isbooked",
                table: "DeskLocations");
        }
    }
}

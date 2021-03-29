using Microsoft.EntityFrameworkCore.Migrations;

namespace EusaHotDeskBooking.Migrations
{
    public partial class UpdateEusaFloorplan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Floor",
                table: "DeskLocations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Floor",
                table: "DeskLocations");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace EusaHotDeskBooking.Migrations
{
    public partial class UpdateEUSAHotdesk0409 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RealDeskName",
                table: "DeskLocations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RealDeskName",
                table: "DeskLocations");
        }
    }
}

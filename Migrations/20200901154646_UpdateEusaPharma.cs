using Microsoft.EntityFrameworkCore.Migrations;

namespace EusaHotDeskBooking.Migrations
{
    public partial class UpdateEusaPharma : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CustomerService",
                table: "DeskLocations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Desks_Bookedto_locationId",
                table: "Desks",
                columns: new[] { "Bookedto", "locationId" },
                unique: true,
                filter: "[Bookedto] IS NOT NULL AND [locationId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Desks_Bookedto_locationId",
                table: "Desks");

            migrationBuilder.DropColumn(
                name: "CustomerService",
                table: "DeskLocations");
        }
    }
}

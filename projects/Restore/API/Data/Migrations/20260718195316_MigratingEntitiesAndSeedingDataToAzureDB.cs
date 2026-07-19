using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class MigratingEntitiesAndSeedingDataToAzureDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "Price",
                value: 46.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "Price",
                value: 175.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "Price",
                value: 175.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "Price",
                value: 25000.0);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedPublicIdForProductEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                schema: "dbo",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "PublicId",
                value: null);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "PublicId",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                schema: "dbo",
                table: "Products");
        }
    }
}

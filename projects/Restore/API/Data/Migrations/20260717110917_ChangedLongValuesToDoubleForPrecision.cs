using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangedLongValuesToDoubleForPrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Price",
                schema: "dbo",
                table: "Products",
                type: "float",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<double>(
                name: "Subtotal",
                schema: "dbo",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<double>(
                name: "Discount",
                schema: "dbo",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<double>(
                name: "DeliveryFee",
                schema: "dbo",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                schema: "dbo",
                table: "OrderItems",
                type: "float",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 20000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Price",
                value: 15000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Price",
                value: 18000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Price",
                value: 30000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Price",
                value: 25000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Price",
                value: 12000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "Price",
                value: 1000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "Price",
                value: 8000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "Price",
                value: 1500.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "Price",
                value: 1800.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "Price",
                value: 1500.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "Price",
                value: 1600.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "Price",
                value: 1400.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "Price",
                value: 25000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "Price",
                value: 18999.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "Price",
                value: 19999.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "Price",
                value: 15000.0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "Price",
                value: 18000.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Price",
                schema: "dbo",
                table: "Products",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<long>(
                name: "Subtotal",
                schema: "dbo",
                table: "Orders",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<long>(
                name: "Discount",
                schema: "dbo",
                table: "Orders",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryFee",
                schema: "dbo",
                table: "Orders",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<long>(
                name: "Price",
                schema: "dbo",
                table: "OrderItems",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 20000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Price",
                value: 15000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Price",
                value: 18000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Price",
                value: 30000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Price",
                value: 25000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Price",
                value: 12000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "Price",
                value: 1000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "Price",
                value: 8000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "Price",
                value: 1500L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "Price",
                value: 1800L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "Price",
                value: 1500L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "Price",
                value: 1600L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "Price",
                value: 1400L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "Price",
                value: 25000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "Price",
                value: 18999L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "Price",
                value: 19999L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "Price",
                value: 15000L);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "Price",
                value: 18000L);
        }
    }
}

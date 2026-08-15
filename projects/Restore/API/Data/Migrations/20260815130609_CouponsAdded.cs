using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class CouponsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Coupon_AmountOff",
                schema: "dbo",
                table: "Baskets",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coupon_CouponId",
                schema: "dbo",
                table: "Baskets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coupon_Name",
                schema: "dbo",
                table: "Baskets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Coupon_PercentOff",
                schema: "dbo",
                table: "Baskets",
                type: "decimal(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coupon_PromotionCode",
                schema: "dbo",
                table: "Baskets",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coupon_AmountOff",
                schema: "dbo",
                table: "Baskets");

            migrationBuilder.DropColumn(
                name: "Coupon_CouponId",
                schema: "dbo",
                table: "Baskets");

            migrationBuilder.DropColumn(
                name: "Coupon_Name",
                schema: "dbo",
                table: "Baskets");

            migrationBuilder.DropColumn(
                name: "Coupon_PercentOff",
                schema: "dbo",
                table: "Baskets");

            migrationBuilder.DropColumn(
                name: "Coupon_PromotionCode",
                schema: "dbo",
                table: "Baskets");
        }
    }
}

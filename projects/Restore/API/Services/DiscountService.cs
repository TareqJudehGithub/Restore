using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class DiscountService
{
  public DiscountService(IConfiguration config)
  {
    StripeConfiguration.ApiKey = config["StripesSettings:SecretKey"];
  }

  public async Task<AppCoupon?> GetCouponFromPromoCode(string code)
  {
    var promotionService = new PromotionCodeService();
    var options = new PromotionCodeListOptions
    {
      Code = code,
      Active = true
    };

    var promotionCodes = await promotionService.ListAsync(options);
    var promotionCode = promotionCodes.FirstOrDefault();

    if (promotionCode is null || promotionCode.Promotion is null || string.IsNullOrWhiteSpace(promotionCode.Promotion.CouponId))
    {
      return null;
    }

    var couponService = new CouponService();
    var coupon = await couponService.GetAsync(promotionCode.Promotion.CouponId);

    return new AppCoupon
    {
      Name = coupon.Name,
      AmountOff = coupon.AmountOff,
      PercentOff = coupon.PercentOff,
      CouponId = coupon.Id,
      PromotionCode = promotionCode.Code
    };
  }

  public async Task<decimal> CalculateDiscountFromAmount(AppCoupon appCoupon, long amount, bool removeDiscount = false)
  {
    var couponService = new CouponService();
    var coupon = await couponService.GetAsync(appCoupon.CouponId);

    if (coupon.AmountOff.HasValue && !removeDiscount)
    {
      return coupon.AmountOff.Value;
    }
    else if (coupon.PercentOff.HasValue && !removeDiscount)
    {
      var discountInCents = Math.Round(amount * (coupon.PercentOff.Value / 100m), MidpointRounding.AwayFromZero);
      return discountInCents;
    }

    return 0;
  }
}

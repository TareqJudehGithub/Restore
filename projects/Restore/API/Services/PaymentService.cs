using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentService(IConfiguration config, DiscountService discountService)
{
  public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket, bool removeDiscount = false)
  {
    StripeConfiguration.ApiKey = config["StripesSettings:SecretKey"];

    var intent = new PaymentIntent();
    var service = new PaymentIntentService();

    var subtotal = basket.Items.Sum(q => q.Quantity * (q.Product.Price * 100));
    var discount = basket.Coupon is not null
      ? await discountService.CalculateDiscountFromAmount(basket.Coupon, (long)subtotal, removeDiscount)
      : 0;

    var subtotalAfterDiscount = subtotal - (double)discount;
    // Free delivery for orders above $100
    var deliveryFee = subtotalAfterDiscount > 10000 ? 0 : 500;

    if (string.IsNullOrWhiteSpace(basket.PaymentIntentId))
    {
      // New PaymentIntent
      var options = new PaymentIntentCreateOptions
      {
        Amount = (long?)(subtotalAfterDiscount + deliveryFee),
        Currency = "usd",
        PaymentMethodTypes = ["card"]
      };
      intent = await service.CreateAsync(options);
    }
    // Update PaymentIntent
    else
    {
      var options = new PaymentIntentUpdateOptions
      {
        Amount = (long?)(subtotalAfterDiscount + deliveryFee)
      };

      await service.UpdateAsync(basket.PaymentIntentId, options);
    }
    return intent;
  }
}

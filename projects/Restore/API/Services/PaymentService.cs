using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentService(IConfiguration config)
{
  public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
  {
    StripeConfiguration.ApiKey = config["StripesSettings:SecretKey"];

    var service = new PaymentIntentService();
    var intent = new PaymentIntent();
    double subtotal = basket.Items.Sum(q => q.Quantity * (q.Product.Price * 100));
    double discount = 0.1;
    double subtotalAfterDiscount = 0;
    if (discount > 0)
    {
      subtotalAfterDiscount = subtotal - (subtotal * discount);
    }
    else
    {
      subtotalAfterDiscount = subtotal;
    }
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

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
    var subtotal = basket.Items.Sum(q => q.Quantity * (q.Product.Price * 100));
    var deliveryFee = subtotal > 1000 ? 0 : 500;

    if (string.IsNullOrWhiteSpace(basket.PaymentIntentId))
    {
      // New PaymentIntent
      var options = new PaymentIntentCreateOptions
      {
        Amount = subtotal + deliveryFee,
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
        Amount = subtotal + deliveryFee
      };
      await service.UpdateAsync(basket.PaymentIntentId, options);
    }
    return intent;
  }
}

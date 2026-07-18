using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// MSSQL 
builder.Services.AddDbContext<StoreSqlDbContext>(Options =>
{
  // SQL Server
  Options.UseSqlServer(builder.Configuration
  .GetConnectionString("MSSQLConnection"));
});

// CORS
builder.Services.AddCors();

// Exceptions 
builder.Services.AddTransient<ExceptionMiddleware>();

//Stripe
builder.Services.AddScoped<PaymentService>();

// Identity
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
  opt.User.RequireUniqueEmail = true;
  opt.Password.RequiredUniqueChars = 1;
  opt.Password.RequireDigit = true;
  opt.Password.RequireUppercase = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreSqlDbContext>();

// Build the project
var app = builder.Build();

// Middlewares
app.UseMiddleware<ExceptionMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(opt =>
{
  opt
  .AllowAnyHeader()
  .AllowAnyMethod()
  .AllowCredentials() // Allows our browser to send up the cookie
  .WithOrigins("https://localhost:3000");
});

//Identity - Make sure these are above the MapControllers() middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Identity Endpoints API for Identity endpoints auto-implementation
app.MapGroup("api").MapIdentityApi<User>();

app.MapFallbackToController("index", "Fallback");

app.Run();


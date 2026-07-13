using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Services 
// Add services to the container.
builder.Services.AddControllers();


#region SQLite - Not used
// builder.Services.AddDbContext<StoreContext>(Options =>
// {
//   // SQLITE
//   Options.UseSqlite(builder.Configuration.GetConnectionString("SqliteConnection"));
// });
#endregion 

#region MSSQL 
builder.Services.AddDbContext<StoreSqlDbContext>(Options =>
{
  // SQL Server
  Options.UseSqlServer(builder.Configuration
  .GetConnectionString("MSSQLConnection"));
});
#endregion

#region CORS
builder.Services.AddCors();
#endregion

#region Exception 
builder.Services.AddTransient<ExceptionMiddleware>();
#endregion

//Stripe
builder.Services.AddScoped<PaymentService>();

#region Identity
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
  opt.User.RequireUniqueEmail = true;
  opt.Password.RequiredUniqueChars = 1;
  opt.Password.RequireDigit = true;
  opt.Password.RequireUppercase = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreSqlDbContext>();
#endregion

#endregion

// Build the project
var app = builder.Build();

#region Middlewares


#region Exceptions
app.UseMiddleware<ExceptionMiddleware>();
#endregion

#region CORS
app.UseCors(opt =>
{
  opt
  .AllowAnyHeader()
  .AllowAnyMethod()
  .AllowCredentials() // Allows our browser to send up the cookie
  .WithOrigins("https://localhost:3000");
});
#endregion

#region Identity - Make sure these are above the MapControllers() middleware
app.UseAuthentication();
app.UseAuthorization();
#endregion

app.MapControllers();

// Identity Endpoints API for Identity endpoints auto-implementation
app.MapGroup("api").MapIdentityApi<User>();

#region SQLite Middleware
// Initialize the database with seed data
//DbDbInitializer.InitDb(app);
#endregion

#endregion

app.Run();


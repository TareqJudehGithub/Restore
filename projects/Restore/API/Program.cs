using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Services 
// Add services to the container.
builder.Services.AddControllers();

#region SQLite 
builder.Services.AddDbContext<StoreContext>(Options =>
{
  // SQLITE
  Options.UseSqlite(builder.Configuration.GetConnectionString("SqliteConnection"));
});
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

#endregion

#region Middlewares
var app = builder.Build();

#region CORS Middleware
app.UseCors(opt =>
{
  opt
  .AllowAnyHeader()
  .AllowAnyMethod()
  .WithOrigins("https://localhost:3000");
});
#endregion

app.MapControllers();

#region SQLite Middleware
// Initialize the database with seed data
DbDbInitializer.InitDb(app);
#endregion

#endregion

app.Run();


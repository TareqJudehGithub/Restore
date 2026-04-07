using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// DbContext
builder.Services.AddDbContext<StoreContext>(Options =>
{
  // SQLite
  Options.UseSqlite(builder.Configuration.GetConnectionString("SqliteConnection"));
});

var app = builder.Build();
// Configure the HTTP request pipeline.
app.MapControllers();

// Initialize the database with seed data
DbDbInitializer.InitDb(app);
app.Run();

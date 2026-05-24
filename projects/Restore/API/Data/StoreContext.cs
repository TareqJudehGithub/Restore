using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

#region Fields
#endregion

// public class StoreContext(DbContextOptions options) : DbContext(options)
// {
public class StoreContext : DbContext
{
  #region Constructors
  public StoreContext(DbContextOptions<StoreContext> options) : base(options)
  {
  }
  #endregion

  #region DbSets
  public DbSet<Product> Products { get; set; }

  #endregion

}


using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] //http:/localhost:5000/api/products
    [ApiController] // attribute to make this class a controller
    public class ProductsController : BaseApiController
    {
        #region SQLITE
        private readonly StoreContext _dbContext;
        public ProductsController(StoreContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region  MSSQL
        // Uncomment code below in order to use MSSQL instead of SQLITE

        // private readonly StoreSqlDbContext _dbContext;
        // public ProductsController(StoreSqlDbContext dbContext)
        // {
        //     _dbContext = dbContext;
        // }
        #endregion

        // GET: //https:/localhost/api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var model = await _dbContext.Products.ToListAsync();
            return Ok(model);
        }
        // GET: //https:/localhost/api/products/3
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            var model = await _dbContext.Products
            .FirstOrDefaultAsync(x => x.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }
    }
}

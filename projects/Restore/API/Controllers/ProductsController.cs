using Microsoft.AspNetCore.Mvc;

using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] //http:/localhost:5000/api/products
    [ApiController] // attribute to make this class a controller
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var model = await _context.Products.ToListAsync();
            return Ok(model);
        }

        [HttpGet] //http:/localhost:5000/api/products/3
        [Route("{id:int}")] //http:/localhost:5000/api/products/3
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            var model = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.DTOs.Product;
using API.Extensions;
using API.RequestHelpers;

namespace API.Controllers
{
    [Route("api/[controller]")] //http:/localhost:5000/api/products
    [ApiController] // attribute to make this class a controller
    public class ProductsController : BaseApiController
    {

        // private readonly StoreContext _dbContext;
        // public ProductsController(StoreContext dbContext)
        // {
        //     _dbContext = dbContext;
        // }


        private readonly StoreSqlDbContext _dbContext;
        public ProductsController(StoreSqlDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: //https:/localhost/api/products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts
        ([FromQuery] ProductParams productParams)
        {

            var query = _dbContext.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(types: productParams.Types, brands: productParams.Brands)
            .AsQueryable();

            var productModel = await PagedList<Product>
            .ToPagedList(
                query,
                productParams.PageNumber,
                productParams.PageSize
                );
            Response.AddPaginationHeader(productModel.Metadata);

            // Map domain model to dto and return it
            var productsDto = productModel
            .Select(q => new GetProductDto()
            {
                Id = q.Id,
                Name = q.Name,
                Description = q.Description,
                Price = q.Price,
                PictureUrl = q.PictureUrl,
                Type = q.Type,
                Brand = q.Brand,
                QuantityInStock = q.QuantityInStock
            });

            return productModel;
        }

        // GET: //https:/localhost/api/products/filters
        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var types = await _dbContext.Products
                .Select(q => q.Type)
                .Distinct()
                .OrderBy(type => type)
                .ToListAsync();

            var brands = await _dbContext.Products
                .Select(q => q.Brand)
                .Distinct()
                .OrderBy(brand => brand)
                .ToListAsync();

            return Ok(new { brands, types });
        }

        // GET: //https:/localhost/api/products/3
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<GetProductDto>> GetProduct([FromRoute] int id)
        {
            var productModel = await _dbContext.Products
            .FirstOrDefaultAsync(x => x.Id == id);

            if (productModel == null) return NotFound();

            return Ok(productModel.ToDto());
        }


        // POST: //https://localhost/api/products
        [HttpPost]
        public async Task<ActionResult<GetProductDto>> CreateProduct(Product product)
        {
            var newProduct = new Product()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                Type = product.Type,
                Brand = product.Brand,
                QuantityInStock = product.QuantityInStock
            };

            await _dbContext.Products.AddAsync(newProduct);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(
                actionName: nameof(GetProduct),
                routeValues: new { id = newProduct.ToDto().Id },
                value: newProduct.ToDto()
            );
        }
        //PUT: https:/localhost/api/products/3
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, UpdateProductDto updateDto)
        {

            if (id != updateDto.Id)
            {
                return BadRequest("DTO ID mismatch between URL and request body.");
            }

            var product = await _dbContext.Products
            .FirstOrDefaultAsync(q => q.Id == id);

            if (product is null)
            {
                return NotFound("Product was not found");
            }
            // Update product and save
            product.Id = updateDto.Id;
            product.Name = updateDto.Name;
            product.Description = updateDto.Description;
            product.Price = updateDto.Price;
            product.PictureUrl = updateDto.PictureUrl;
            product.Type = updateDto.Type;
            product.Brand = updateDto.Brand;
            product.QuantityInStock = updateDto.QuantityInStock;

            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(
                         actionName: nameof(GetProduct),
                         routeValues: new { id = product.ToDto().Id },
                         value: product.ToDto()
                     );

        }

        [HttpDelete]
        [Route("{id:int}")]
        // DELETE: https:/localhost/api/products/3
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product = await _dbContext.Products
            .FirstOrDefaultAsync(q => q.Id == id);

            if (product is null)
            {
                return NotFound("Product not found");
            }
            if (id != product.Id)
            {
                return BadRequest("Invalid product Id");
            }

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction(actionName: nameof(GetProducts));
        }
    }

}

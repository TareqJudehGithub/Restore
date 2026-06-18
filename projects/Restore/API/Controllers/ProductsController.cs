using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.DTOs.Product;

namespace API.Controllers
{
    [Route("api/[controller]")] //http:/localhost:5000/api/products
    [ApiController] // attribute to make this class a controller
    public class ProductsController : BaseApiController
    {
        #region SQLITE
        // private readonly StoreContext _dbContext;
        // public ProductsController(StoreContext dbContext)
        // {
        //     _dbContext = dbContext;
        // }
        #endregion

        #region  MSSQL
        // Uncomment code below in order to use MSSQL instead of SQLITE

        private readonly StoreSqlDbContext _dbContext;
        public ProductsController(StoreSqlDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        // GET: //https:/localhost/api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var productModel = await _dbContext.Products.ToListAsync();

            var productDto = productModel.Select(q => new GetProductDto()
            {
                IdDto = q.Id,
                NameDto = q.Name,
                DescriptionDto = q.Description,
                PriceDto = q.Price,
                PictureUrlDto = q.PictureUrl,
                TypeDto = q.Type,
                BrandDto = q.Brand,
                QuantityInStockDto = q.QuantityInStock
            });
            return Ok(productDto);
        }

        // GET: //https:/localhost/api/products/3
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            var productModel = await _dbContext.Products
            .FirstOrDefaultAsync(x => x.Id == id);

            if (productModel == null) return NotFound();

            var productDto = new GetProductDto()
            {
                IdDto = productModel.Id,
                NameDto = productModel.Name,
                DescriptionDto = productModel.Description,
                PriceDto = productModel.Price,
                PictureUrlDto = productModel.PictureUrl,
                TypeDto = productModel.Type,
                BrandDto = productModel.Brand,
                QuantityInStockDto = productModel.QuantityInStock
            };

            return Ok(productModel);
        }

        // POST: //https://localhost/api/products
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
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

            var newProductDto = new GetProductDto()
            {
                IdDto = newProduct.Id,
                NameDto = newProduct.Name,
                DescriptionDto = newProduct.Description,
                PriceDto = newProduct.Price,
                PictureUrlDto = newProduct.PictureUrl,
                TypeDto = newProduct.Type,
                BrandDto = newProduct.Brand,
                QuantityInStockDto = newProduct.QuantityInStock
            };

            return CreatedAtAction(
                actionName: nameof(GetProduct),
                routeValues: new { id = newProductDto.IdDto },
                value: newProductDto
            );
        }
    }
}

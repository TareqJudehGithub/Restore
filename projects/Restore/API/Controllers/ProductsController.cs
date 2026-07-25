using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.DTOs.Product;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")] //http:/localhost:5000/api/products
    [ApiController] // attribute to make this class a controller
    public class ProductsController : BaseApiController
    {
        private readonly StoreSqlDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(
            StoreSqlDbContext dbContext,
            IMapper mapper,
            ImageService imageService
            )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _imageService = imageService;
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

        [Authorize(Roles = "Admin")]
        // POST: //https://localhost/api/products
        [HttpPost]
        public async Task<ActionResult<GetProductDto>> CreateProduct(
            CreateProductDto productDto
            )
        {
            var product = _mapper.Map<Product>(productDto);

            // Cloudinary
            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }
                // Set image in product with Cloudinary image url            
                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            await _dbContext.Products.AddAsync(product);
            var result = await _dbContext.SaveChangesAsync();
            if (result == 0)
            {
                return BadRequest("Problem creating a new product");
            }

            return CreatedAtAction(
                actionName: nameof(GetProduct),
                routeValues: new { id = product.Id },
                value: product.ToDto()
            );
        }

        //PUT: https:/localhost/api/products/
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateProduct(
            UpdateProductDto updateDto)
        {

            var product = await _dbContext.Products
            .FirstOrDefaultAsync(q => q.Id == updateDto.Id);

            if (product is null)
            {
                return NotFound("Product was not found");
            }

            product = _mapper.Map(updateDto, product);


            // Update existing Cloudinary image
            if (updateDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateDto.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }
                if (!string.IsNullOrWhiteSpace(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }
                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            if (product.Id != updateDto.Id)
            {
                return BadRequest("DTO ID mismatch between URL and request body.");
            }

            var result = await _dbContext.SaveChangesAsync();

            if (result == 0)
            {
                return BadRequest("Error updating product");
            }

            return CreatedAtAction(
                         actionName: nameof(GetProduct),
                         routeValues: new { id = product.Id },
                         value: product.ToDto()
                     );

        }

        [Authorize(Roles = "Admin")]
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
            // Delete Cloudinary image
            if (!string.IsNullOrWhiteSpace(product.PublicId))
            {
                await _imageService.DeleteImageAsync(product.PublicId);
            }

            _dbContext.Products.Remove(product);
            var result = await _dbContext.SaveChangesAsync();
            if (result > 0)
            {
                return Ok($"{product.Name} was successfully deleted.");
            }
            return RedirectToAction(actionName: nameof(GetProducts));
        }
    }

}

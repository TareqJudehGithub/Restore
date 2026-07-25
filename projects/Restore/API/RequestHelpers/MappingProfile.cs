using API.DTOs.Product;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers;

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    CreateMap<CreateProductDto, Product>();
    CreateMap<GetProductDto, Product>();
    CreateMap<UpdateProductDto, Product>().ReverseMap();
  }
}

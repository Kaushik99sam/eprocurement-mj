package com.mjPro.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.mjPro.entity.Product;
import com.mjPro.repo.ProductRepo;
import com.mjPro.service.ProductService;
import com.mjPro.vo.ProductVo;
@Service
public class ProductImpl implements ProductService {

	@Autowired
	ProductRepo productRepo;
	@Override
	public List<ProductVo> getAllProduct() {
		
		
				List<Product> listEntity=productRepo.findAll(); 
				List<ProductVo> listVo= new ArrayList<>();
				
				for(Product pe:listEntity)
				{
					ProductVo p= new ProductVo(pe.getId(),pe.getMeasurable_unit(),pe.getQty(),pe.getName(),pe.getPrice());
					listVo.add(p);
					
				}
				
				
				return listVo;
	}

	@Override
	public void saveProduct(ProductVo vo) {

		Product prod = new Product();
		prod.setMeasurable_unit(vo.getMeasurable_unit());
		prod.setName(vo.getName());
		prod.setPrice(vo.getPrice());
		prod.setQty(vo.getQty());
		productRepo.save(prod);
	}

	@Override
	public ProductVo findProductById(int id) {

		ProductVo vo= null;
		Product prod=productRepo.findById(id).get();
			vo= new ProductVo(prod.getId(),prod.getName(),prod.getQty(),prod.getMeasurable_unit(),prod.getPrice());
		return vo;
	}

	@Override
	public void editProduct(ProductVo vo) {
		
		Product pe =productRepo.findById(vo.getId()).get();
		pe.setMeasurable_unit(vo.getMeasurable_unit());
		pe.setName(vo.getName());
		pe.setPrice(vo.getPrice());
		pe.setQty(vo.getQty());
		productRepo.save(pe);
	}

	@Override
	public void deleteProduct(int id) {
		productRepo.deleteById(id);
	}

	
}

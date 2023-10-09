package com.mjPro.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.entity.Product;
import com.mjPro.repo.ProductRepo;
import com.mjPro.service.ProductService;
@Service
public class ProductImpl implements ProductService {

	@Autowired
	ProductRepo productRepo;
	
	@Override
	public List<Product> getAllProduct() {
		
		List<Product> listProduct= productRepo.findAll();
		
	}

	@Override
	public void saveProduct(Product product) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Product findProductById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void editProduct(Product product) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Boolean deleteProduct(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}

package com.mjPro.service;

import java.util.List;

import com.mjPro.entity.Product;

public interface ProductService {

	List<Product> getAllProduct();
	void saveProduct(Product product);
	Product findProductById(int id);
	void editProduct(Product product);
	Boolean deleteProduct(int id);
}

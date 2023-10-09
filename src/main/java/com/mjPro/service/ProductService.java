package com.mjPro.service;

import java.util.List;

import com.mjPro.entity.Product;
import com.mjPro.vo.ProductVo;

public interface ProductService {

	List<ProductVo> getAllProduct();
	void saveProduct(ProductVo product);
	ProductVo findProductById(int id);
	void editProduct(ProductVo product);
	void deleteProduct(int id);
}

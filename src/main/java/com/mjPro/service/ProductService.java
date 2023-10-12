package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.ProductVo;

public interface ProductService {
	
	public ResponseEntity<String> addProductData(ProductVo provo);
	
	public ResponseEntity<List<ProductVo>> getAll();
	
	public ResponseEntity<ProductVo> getById(int id);
	
	public ResponseEntity<String> deleteProductData(int id);
}

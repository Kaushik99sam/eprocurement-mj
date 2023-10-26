package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.ProductVo;

public interface ProductService {
	
	public String addData(ProductVo provo);
	
	public List<ProductVo> getAll();
	
	public ProductVo getById(int id);
	
	public String deleteData(int id);
}

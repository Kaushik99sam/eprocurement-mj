package com.mjPro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjPro.Vo.ProductVo;
import com.mjPro.service.impl.ProductServiceImpl;

@RestController
@RequestMapping("/product")

public class ProductController {

	@Autowired
	ProductServiceImpl pserv;
	
	@PostMapping("/")
	public void addData(@RequestBody ProductVo pvo) {
		pserv.addProductData(pvo);
	}
	
	@GetMapping("/")
	public List<ProductVo> getAll(){
		return pserv.getAll();
	}
	
	@GetMapping("/{id}")
	public ProductVo getById(@PathVariable int id) {
		return pserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteData(@PathVariable int id) {
		pserv.deleteProductData(id);
	}
}

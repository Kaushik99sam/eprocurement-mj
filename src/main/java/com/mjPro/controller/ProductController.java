package com.mjPro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<String> addData(@RequestBody ProductVo pvo) {
		return pserv.addProductData(pvo);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<ProductVo>> getAll(){
		return pserv.getAll();
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductVo> getById(@PathVariable int id) {
		return pserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		return pserv.deleteProductData(id);
	}
}

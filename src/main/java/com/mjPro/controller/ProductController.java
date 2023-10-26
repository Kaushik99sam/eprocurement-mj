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
		String str = pserv.addData(pvo);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<ProductVo>> getAll(){
		List<ProductVo> provoList = pserv.getAll();
		if(provoList != null) {
			return ResponseEntity.ok().body(provoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductVo> getById(@PathVariable int id) {
		ProductVo provo = pserv.getById(id);
		if(provo != null) {
			return ResponseEntity.ok().body(provo);
		}
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = pserv.deleteData(id);
		return ResponseEntity.ok().body(str);
	}
}

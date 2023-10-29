package com.mjPro.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjPro.Vo.CsVo;
import com.mjPro.Vo.PoVo;
import com.mjPro.service.impl.PoServiceimpl;

@RestController
@RequestMapping("/po")
@CrossOrigin("*")
public class PoController {

	@Autowired
	PoServiceimpl poserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody PoVo povo) {
		String str = poserv.addData(povo);
//		String str = "hello";
		System.out.println(povo);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<PoVo>> getAll() {
		List<PoVo> povoList = poserv.getAll();
		if(povoList != null) {
			return ResponseEntity.ok().body(povoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PoVo> getById(@PathVariable int id) {
		PoVo povo = poserv.getById(id);
		if(povo != null) {
			return ResponseEntity.ok().body(povo);
		}
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = poserv.deleteData(id);
		return ResponseEntity.ok().body(str); 
	}
	
}

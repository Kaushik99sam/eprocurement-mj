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

import com.mjPro.Vo.CsVo;
import com.mjPro.Vo.PoVo;
import com.mjPro.service.impl.PoServiceimpl;

@RestController
@RequestMapping("/po")
public class PoController {

	@Autowired
	PoServiceimpl poserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody PoVo povo) {
		return poserv.addData(povo);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<PoVo>> getAll() {
		return poserv.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PoVo> getById(@PathVariable int id) {
		return poserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		return poserv.deleteData(id);
	}
	
}

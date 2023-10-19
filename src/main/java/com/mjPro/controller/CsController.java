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
import com.mjPro.service.impl.CsServiceImpl;

@RestController
@RequestMapping("/cs")

public class CsController {

	@Autowired
	CsServiceImpl csserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody CsVo csvo) {
		return csserv.addData(csvo);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CsVo>> getAll() {
		return csserv.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CsVo> getById(@PathVariable int id) {
		return csserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		return csserv.deleteData(id);
	}
}

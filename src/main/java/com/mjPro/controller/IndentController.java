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

import com.mjPro.Vo.IndentVo;
import com.mjPro.service.impl.IndentServiceImpl;

@RestController
@RequestMapping("/indent")
@CrossOrigin("*")
public class IndentController {

	@Autowired
	IndentServiceImpl iserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody IndentVo ivo) {
		String str = iserv.addData(ivo);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<IndentVo>> getAll(){
		List<IndentVo> ivoList = iserv.getAll();
		if(ivoList != null) {
			return ResponseEntity.ok().body(ivoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<IndentVo> getById(@PathVariable int id) {
		IndentVo ivo = iserv.getById(id);
		if(ivo != null) {
			return ResponseEntity.ok().body(ivo);
		}
		return ResponseEntity.noContent().build(); 
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = iserv.deleteData(id);
		return ResponseEntity.ok().body(str);
	}
}

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

import com.mjPro.Vo.IndentVo;
import com.mjPro.service.impl.IndentServiceImpl;

@RestController
@RequestMapping("/indent")

public class IndentController {

	@Autowired
	IndentServiceImpl iserv;
	
	@PostMapping("/")
	public void addData(@RequestBody IndentVo ivo) {
		iserv.addIndentData(ivo);
	}
	
	@GetMapping("/")
	public List<IndentVo> getAll(){
		return iserv.getAll();
	}
	
	@GetMapping("/{id}")
	public IndentVo getById(@PathVariable int id) {
		return iserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteData(@PathVariable int id) {
		iserv.deleteData(id);
	}
}

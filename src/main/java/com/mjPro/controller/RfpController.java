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

import com.mjPro.Vo.RfpVo;
import com.mjPro.service.impl.RfpServiceImpl;

@RestController
@RequestMapping("/rfp")

public class RfpController {

	@Autowired
	RfpServiceImpl rserv;
	
	@PostMapping("/")
	public void addData(@RequestBody RfpVo rvo) {
		rserv.addRfpData(rvo);
	}
	
	@GetMapping("/")
	public List<RfpVo> getAll(){
		return rserv.getAll();
	}
	
	@GetMapping("/{id}")
	public RfpVo getById(@PathVariable int id) {
		return rserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteData(@PathVariable int id) {
		rserv.deleteData(id);
	}
}

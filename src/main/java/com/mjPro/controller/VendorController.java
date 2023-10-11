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

import com.mjPro.Vo.VendorVo;
import com.mjPro.service.impl.VendorServiceImpl;

@RestController
@RequestMapping("/vendor")

public class VendorController {
	
	@Autowired
	VendorServiceImpl vserv;
	
	@PostMapping("/")
	public void addData(@RequestBody VendorVo venvo) {
		vserv.addVendorData(venvo);
	}
	
	@GetMapping("/")
	public List<VendorVo> getAll(){
		return vserv.getAll();
	}
	
	@GetMapping("/{id}")
	public VendorVo getById(@PathVariable int id) {
		return vserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteData(@PathVariable int id) {
		vserv.deleteVendorData(id);
	}

}

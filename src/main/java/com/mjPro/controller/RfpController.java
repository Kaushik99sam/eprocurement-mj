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

import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.service.impl.RfpServiceImpl;

@RestController
@RequestMapping("/rfp")

public class RfpController {

	@Autowired
	RfpServiceImpl rserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody RfpVo rvo) {
		return rserv.addRfpData(rvo);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<RfpVo>> getAll(){
		return rserv.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<RfpVo> getById(@PathVariable int id) {
		return rserv.getById(id);
	}
	
	@GetMapping("/vendor/{id}")
	public ResponseEntity<List<VendorVo>> getVendorListByRfpId(@PathVariable int id){
		return rserv.getVendorListByRfpId(id);
		
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		return rserv.deleteData(id);
	}
}

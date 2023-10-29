package com.mjPro.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.service.impl.RfpServiceImpl;

@RestController
@RequestMapping("/rfp")
@CrossOrigin("*")
public class RfpController {

	@Autowired
	RfpServiceImpl rserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody RfpVo rvo) {
		String str = rserv.addData(rvo);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<RfpVo>> getAll(){
		List<RfpVo> rfpvoList = rserv.getAll();
		if(rfpvoList != null) {
			return ResponseEntity.ok().body(rfpvoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<RfpVo> getById(@PathVariable int id) {
		RfpVo rfpvo = rserv.getById(id);
		if(rfpvo != null) {
			return ResponseEntity.ok().body(rfpvo);
		}
		return ResponseEntity.noContent().build();
	}
	
//	@GetMapping("/vendor/{id}")
//	public ResponseEntity<List<VendorVo>> getVendorListByRfpId(@PathVariable int id){
//		return rserv.getVendorListByRfpId(id);
//	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = rserv.deleteData(id);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/obj")
	public ResponseEntity<List<Map<String,Double>>> getObj(){
		List<Map<String,Double>> obj = new ArrayList<Map<String,Double>>();
		obj.add(new HashMap<String, Double>());
		
		return ResponseEntity.ok(obj);
	}
}

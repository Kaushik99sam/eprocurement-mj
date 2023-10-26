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

import com.mjPro.Vo.VendorVo;
import com.mjPro.service.impl.VendorServiceImpl;

@RestController
@RequestMapping("/vendor")
@CrossOrigin("*")
public class VendorController {
	
	@Autowired
	VendorServiceImpl vserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody VendorVo venvo) {
		String str = vserv.addData(venvo);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<VendorVo>> getAll(){
		List<VendorVo> venvoList = vserv.getAll();
		if(venvoList != null) {
			return ResponseEntity.ok().body(venvoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<VendorVo> getById(@PathVariable int id) {
		VendorVo venvo = vserv.getById(id);
		if(venvo != null) {
			return ResponseEntity.ok().body(venvo);
		}
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = vserv.deleteData(id);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/rfp/{id}")
	public ResponseEntity<List<VendorVo>> getByRfpId(@PathVariable int id){
		return ResponseEntity.ok(vserv.getByRfpId(id));
	}

}

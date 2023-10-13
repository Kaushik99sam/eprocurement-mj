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

import com.mjPro.Vo.RefTableVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.RefTable;
import com.mjPro.service.impl.RefTableServiceImpl;

@RestController
@RequestMapping("/reftable")

public class RefTableController {

	@Autowired
	RefTableServiceImpl refserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody RefTableVo rvo) {
		return refserv.addRefTableData(rvo);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<RefTableVo>> getAll(){
		return refserv.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<RefTableVo> getById(@PathVariable int id) {
		return refserv.getById(id);
	}
	
	@GetMapping("/vendor/{id}")  // to get all reftable object for a particular vendorid
	public List<RefTable> getByVendorId(@PathVariable int id){
		return refserv.getByVendorId(id);
		
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		return refserv.deleteData(id);
	}
}

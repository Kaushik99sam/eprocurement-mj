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

import com.mjPro.Vo.ProductVo;
import com.mjPro.Vo.RefTableVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.RefTable;
import com.mjPro.service.impl.RefTableServiceImpl;

@RestController
@RequestMapping("/reftable")
@CrossOrigin("*")
public class RefTableController {

	@Autowired
	RefTableServiceImpl refserv;
	
	@PostMapping("/")
	public ResponseEntity<String> addData(@RequestBody RefTableVo rvo) {
		String str = refserv.addData(rvo);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<RefTableVo>> getAll(){
		List<RefTableVo> refvoList = refserv.getAll();
		if(refvoList != null) {
			return ResponseEntity.ok().body(refvoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<RefTableVo> getById(@PathVariable int id) {
		RefTableVo refvo = refserv.getById(id);
		if(refvo != null) {
			return ResponseEntity.ok().body(refvo);
		}
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = refserv.deleteData(id);
		return ResponseEntity.ok().body(str);
	}
	
	@GetMapping("/rfp/{id}")  // to get all reftable object for a particular vendorid
	public List<RefTableVo> getByRfp(@PathVariable int id){
		return refserv.getByRfp(id);
	}
	
	@GetMapping("/vendor/{id}")
	public List<RefTableVo> getProductByVendorId(@PathVariable int id){
		return refserv.getProductByVendorId(id);
	}
}

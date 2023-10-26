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
		String str = csserv.addData(csvo);
		if(str != null) {
			return ResponseEntity.ok().body(str);
		}
		return ResponseEntity.badRequest().build();
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CsVo>> getAll() {
		List<CsVo> csvoList = csserv.getAll();
		if(csvoList != null) {
			return ResponseEntity.ok().body(csvoList);
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CsVo> getById(@PathVariable int id) {
		CsVo csvo = csserv.getById(id);
		if(csvo != null) {
			return ResponseEntity.ok().body(csvo);
		}
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable int id) {
		String str = csserv.deleteData(id);
		return ResponseEntity.ok().body(str);
	}
}

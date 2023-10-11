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

import com.mjPro.Vo.RefTableVo;
import com.mjPro.service.impl.RefTableServiceImpl;

@RestController
@RequestMapping("/reftable")

public class RefTableController {

	@Autowired
	RefTableServiceImpl refserv;
	
	@PostMapping("/")
	public void addData(@RequestBody RefTableVo rvo) {
		refserv.addRefTableData(rvo);
	}
	
	@GetMapping("/")
	public List<RefTableVo> getAll(){
		return refserv.getAll();
	}
	
	@GetMapping("/{id}")
	public RefTableVo getById(@PathVariable int id) {
		return refserv.getById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteData(@PathVariable int id) {
		refserv.deleteData(id);
	}
}

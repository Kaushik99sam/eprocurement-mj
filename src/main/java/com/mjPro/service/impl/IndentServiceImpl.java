package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.IndentVo;
import com.mjPro.entity.Indent;
import com.mjPro.repo.IndentRepo;
import com.mjPro.service.IndentService;

@Service
public class IndentServiceImpl implements IndentService{
	@Autowired
	IndentRepo irepo;
	
	@Override
	public ResponseEntity<String> addIndentData(IndentVo ivo) {
		Indent i = irepo.save(new Indent());
		if(i == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not inserted in database");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Data inserted in database");
		
	}
	
	@Override
	public ResponseEntity<List<IndentVo>> getAll() {
		List<Indent> ilist = irepo.findAll();
		List<IndentVo> ivolist = new ArrayList<IndentVo>();
		
		if(ilist == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		for(Indent i : ilist) {
			IndentVo ivon = new IndentVo(i.getId());
			ivolist.add(ivon);
		}
		return ResponseEntity.status(HttpStatus.OK).body(ivolist);
	}
	
	@Override
	public ResponseEntity<IndentVo> getById(int id) {
		Indent i = irepo.findById(id).get();
		if(i == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		IndentVo ivo = new IndentVo(i.getId());
		return ResponseEntity.status(HttpStatus.OK).body(ivo);
	}
	
	@Override
	public ResponseEntity<String> deleteData(int id) {
		irepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Data deleted successfully!!!");
	}
}

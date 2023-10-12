package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.RefTableVo;

public interface RefTableService {
	
	public ResponseEntity<String> addRefTableData(RefTableVo refvo);
	
	public ResponseEntity<List<RefTableVo>> getAll();
	
	public ResponseEntity<RefTableVo> getById(int id);
	
	public ResponseEntity<String> deleteData(int id);
}

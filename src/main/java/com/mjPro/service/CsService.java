package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.CsVo;

public interface CsService {
	
	public ResponseEntity<String> addCsData(CsVo csvo);
	
	public ResponseEntity<List<CsVo>> getAll();
	
	public ResponseEntity<CsVo> getById(int id);
	
	public ResponseEntity<String> deleteCsData(int id);
}

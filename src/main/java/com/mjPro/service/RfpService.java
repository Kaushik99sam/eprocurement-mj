package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.RfpVo;

public interface RfpService {
	
	public ResponseEntity<String> addRfpData(RfpVo rfpvo);
	
	public ResponseEntity<List<RfpVo>> getAll();
	
	public ResponseEntity<RfpVo> getById(int id);
	
	public ResponseEntity<String> deleteData(int id);
}

package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.IndentVo;

public interface IndentService {
	
	public ResponseEntity<String> addIndentData(IndentVo ivo);
	
	public ResponseEntity<List<IndentVo>> getAll();
	
	public ResponseEntity<IndentVo> getById(int id);
	
	public ResponseEntity<String> deleteData(int id);
}

package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.IndentVo;

public interface IndentService {
	
	public void addData(IndentVo ivo);
	
	public List<IndentVo> getAll();
	
	public IndentVo getById(int id);
	
	public void deleteData(int id);
}

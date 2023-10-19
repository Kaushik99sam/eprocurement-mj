package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.RefTableVo;

public interface RefTableService {
	
	public void addData(RefTableVo refvo);
	
	public List<RefTableVo> getAll();
	
	public RefTableVo getById(int id);
	
	public void deleteData(int id);
}

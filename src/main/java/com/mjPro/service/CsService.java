package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.CsVo;

public interface CsService {
	
	public String addData(CsVo csvo);
	
	public List<CsVo> getAll();
	
	public CsVo getById(int id);
	
	public String deleteData(int id);
}

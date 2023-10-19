package com.mjPro.service;

import java.util.List;

import com.mjPro.Vo.PoVo;

public interface PoService {

	public void addData(PoVo pvo);
	
	public List<PoVo> getAll();
	
	public PoVo getById(int id);
	
	public void deleteData(int id);
}

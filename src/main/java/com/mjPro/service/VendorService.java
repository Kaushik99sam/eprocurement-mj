package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.VendorVo;

public interface VendorService {
	
	public void addData(VendorVo venvo);
	
	public List<VendorVo> getAll();
	
	public VendorVo getById(int id);
	
	public void deleteData(int id);
}

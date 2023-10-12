package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.VendorVo;

public interface VendorService {
	
	public ResponseEntity<String> addVendorData(VendorVo venvo);
	
	public ResponseEntity<List<VendorVo>> getAll();
	
	public ResponseEntity<VendorVo> getById(int id);
	
	public ResponseEntity<String> deleteVendorData(int id);
}

package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;

public interface RfpService {
	
	public ResponseEntity<String> addRfpData(RfpVo rfpvo);
	
	public ResponseEntity<List<RfpVo>> getAll();
	
	public ResponseEntity<RfpVo> getById(int id);
	
	public ResponseEntity<String> deleteData(int id);
	
	public ResponseEntity<List<VendorVo>> getVendorListByRfpId(int id);
}

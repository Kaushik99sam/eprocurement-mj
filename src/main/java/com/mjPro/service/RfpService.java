package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;

public interface RfpService {
	
	public String addData(RfpVo rfpvo);
	
	public List<RfpVo> getAll();
	
	public RfpVo getById(int id);
	
	public String deleteData(int id);
	
}

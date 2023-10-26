package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.ProductVo;
import com.mjPro.Vo.RefTableVo;
import com.mjPro.entity.Product;

public interface RefTableService {
	
	public String addData(RefTableVo refvo);
	
	public List<RefTableVo> getAll();
	
	public RefTableVo getById(int id);
	
	public String deleteData(int id);
	
	public List<RefTableVo> getByRfp(int id);
		
	public List<RefTableVo> getProductByVendorId(int id);
}

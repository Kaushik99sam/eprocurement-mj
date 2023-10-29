package com.mjPro.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mjPro.Vo.ProductVo;
import com.mjPro.Vo.RefTableVo;
import com.mjPro.entity.Product;
import com.mjPro.repo.RefProjection;

public interface RefTableService {
	
	public String addData(RefTableVo refvo);
	
	public List<RefTableVo> getAll();
	
	public RefTableVo getById(int id);
	
	public String deleteData(int id);
	
	public List<RefTableVo> getByRfp(int id);
		
	public List<RefTableVo> getProductByVendorId(int id);
	
	public List<Object> getProductWithVendorList(int id);
	
//	public List<RefProjection> getRefProjection();
}

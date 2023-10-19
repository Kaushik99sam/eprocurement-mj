package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.ProductVo;
import com.mjPro.repo.ProductRepo;
import com.mjPro.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	ProductRepo prepo;

	@Override
	public void addData(ProductVo provo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ProductVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProductVo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		prepo.deleteById(id);
	}
	
}

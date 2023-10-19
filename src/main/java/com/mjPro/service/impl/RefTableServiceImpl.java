package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.RefTableVo;
import com.mjPro.repo.ProductRepo;
import com.mjPro.repo.RefTableRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.RefTableService;

@Service
public class RefTableServiceImpl implements RefTableService{
	
	@Autowired
	VendorRepo vrepo;
	
	@Autowired
	ProductRepo prepo;
	
	@Autowired
	RefTableRepo refrepo;

	@Override
	public void addData(RefTableVo refvo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<RefTableVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RefTableVo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		
	}
	
	
	
}

package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.VendorVo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.VendorService;

@Service
public class VendorServiceImpl implements VendorService{
	
	@Autowired
	VendorRepo venrepo;

	@Override
	public void addData(VendorVo venvo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<VendorVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public VendorVo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		
	}
	
	
}

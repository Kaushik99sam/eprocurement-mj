package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.CsVo;
import com.mjPro.repo.CsRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.CsService;

@Service
public class CsServiceImpl implements CsService{
	@Autowired
	CsRepo csrepo;
	
	@Autowired
	VendorRepo venrepo;

	@Override
	public void addData(CsVo csvo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<CsVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CsVo getById(int id) {
		return null;
	}

	@Override
	public void deleteData(int id) {
	
		csrepo.deleteById(id);
		
	}
	
}

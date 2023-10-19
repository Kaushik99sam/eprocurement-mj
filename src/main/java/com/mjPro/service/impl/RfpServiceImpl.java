package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.RfpVo;
import com.mjPro.repo.CsRepo;
import com.mjPro.repo.IndentRepo;
import com.mjPro.repo.RfpRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.RfpService;

@Service
public class RfpServiceImpl implements RfpService{
	@Autowired
	IndentRepo irepo;
	
	@Autowired
	CsRepo csrepo;
	
	@Autowired
	VendorRepo venrepo;
	
	@Autowired
	RfpRepo rrepo;

	@Override
	public void addData(RfpVo rfpvo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<RfpVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RfpVo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		rrepo.deleteById(id);
		}


	
	
	
}

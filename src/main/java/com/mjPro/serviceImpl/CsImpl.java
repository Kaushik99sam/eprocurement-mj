package com.mjPro.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.repo.CsRepo;
import com.mjPro.service.CsService;
import com.mjPro.vo.CsVo;
@Service
public class CsImpl implements CsService {

	@Autowired
	CsRepo csRepo;
	
	@Override
	public CsVo getAllCs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveCs(CsVo cs) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public CsVo findCsById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void editCs(CsVo cs) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCs(int id) {
		// TODO Auto-generated method stub
		
	}

}

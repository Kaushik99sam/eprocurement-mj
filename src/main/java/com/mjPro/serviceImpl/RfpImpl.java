package com.mjPro.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.entity.Rfp;
import com.mjPro.repo.RfpRepo;
import com.mjPro.service.RfpService;
import com.mjPro.vo.RfpVo;
@Service
public class RfpImpl implements RfpService {

	@Autowired
	RfpRepo repo;
	@Override
	public List<RfpVo> getAllRfp() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveRfp(RfpVo rfp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Rfp findRfpById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void editRfp(RfpVo rfp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteRfp(int id) {
		// TODO Auto-generated method stub
	
	}

}
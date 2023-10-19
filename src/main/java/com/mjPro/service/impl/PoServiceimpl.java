package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.PoVo;
import com.mjPro.repo.PoRepo;
import com.mjPro.service.PoService;
@Service
public class PoServiceimpl implements PoService {

	@Autowired
	PoRepo poRepo;
	
	@Override
	public void addData(PoVo pvo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<PoVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PoVo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		poRepo.deleteById(id);
	}

}

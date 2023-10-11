package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.CsVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Cs;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.CsRepo;
import com.mjPro.repo.VendorRepo;

@Service
public class CsServiceImpl {
	@Autowired
	CsRepo csrepo;
	
	@Autowired
	VendorRepo venrepo;
	
	public void addCsData(CsVo csvo) {
		csrepo.save(new Cs());
	}
	
	public List<CsVo> getAll(){
		List<Cs> csList = csrepo.findAll();
		List<CsVo> csvoList = new ArrayList<CsVo>();
		
		for(Cs c : csList) {
			CsVo csv = new CsVo(c.getId());
			csvoList.add(csv);
		}
		return csvoList;
	}
	
	public CsVo getById(int id) {
		Cs cs = csrepo.findById(id).get();
		
		if(cs == null) {
			return null;
		}
		
		CsVo csvo = new CsVo(cs.getId());
		return csvo;		
	}
	
	public void deleteCsData(int id) {
		csrepo.deleteById(id);
	}
}

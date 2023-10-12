package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.CsVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Cs;
import com.mjPro.entity.Vendor;
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
	public ResponseEntity<String> addCsData(CsVo csvo) {
		Cs cs = csrepo.save(new Cs());
		if(cs == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not inserted in database");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Data inserted in database");
		
	}
	
	@Override
	public ResponseEntity<List<CsVo>> getAll(){
		List<Cs> csList = csrepo.findAll();
		List<CsVo> csvoList = new ArrayList<CsVo>();
		
		if(csList == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		
		for(Cs c : csList) {
			CsVo csv = new CsVo(c.getId());
			csvoList.add(csv);
		}
		return ResponseEntity.status(HttpStatus.OK).body(csvoList);
	}
	
	@Override
	public ResponseEntity<CsVo> getById(int id) {
		Cs cs = csrepo.findById(id).get();
		
		if(cs == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		
		CsVo csvo = new CsVo(cs.getId());
		return ResponseEntity.status(HttpStatus.OK).body(csvo);		
	}
	
	@Override
	public ResponseEntity<String> deleteCsData(int id) {
		csrepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Data deleted successfully!!!");
	}
}

package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.VendorService;

@Service
public class VendorServiceImpl implements VendorService{
	
	@Autowired
	VendorRepo venrepo;
	
	@Override
	public ResponseEntity<String> addVendorData(VendorVo venvo) {
		Vendor vendor = new Vendor();
		vendor.setName(venvo.getName());
		vendor.setVendorId(venvo.getVendorId());
		vendor.setEmail(venvo.getEmail());
		
		vendor = venrepo.save(vendor);
		
		if(vendor == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not inserted in database");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Data inserted in database");
		
	}
	
	@Override
	public ResponseEntity<List<VendorVo>> getAll(){
		List<Vendor> venList = venrepo.findAll();
		List<VendorVo> volist = new ArrayList<VendorVo>();
		
		if(venList == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		for(Vendor v : venList) {
			VendorVo vo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
			volist.add(vo);
		}
		return ResponseEntity.status(HttpStatus.OK).body(volist);
	}
	
	@Override
	public ResponseEntity<VendorVo> getById(int id) {
		Vendor v = venrepo.findById(id).get();
		if(v == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		VendorVo vo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
		return ResponseEntity.status(HttpStatus.OK).body(vo);
	}
	
	@Override
	public ResponseEntity<String> deleteVendorData(int id) {
		venrepo.deleteById(id);
		
		return ResponseEntity.status(HttpStatus.OK).body("Data deleted successfully!!!");
	}
}

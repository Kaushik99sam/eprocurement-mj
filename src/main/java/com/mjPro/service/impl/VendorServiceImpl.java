package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.VendorRepo;

@Service
public class VendorServiceImpl {
	
	@Autowired
	VendorRepo venrepo;
	
	public void addVendorData(VendorVo venvo) {
		Vendor vendor = new Vendor();
		vendor.setName(venvo.getName());
		vendor.setVendorId(venvo.getVendorId());
		vendor.setEmail(venvo.getEmail());
		venrepo.save(vendor);
	}
	
	public List<VendorVo> getAll(){
		List<Vendor> venList = venrepo.findAll();
		List<VendorVo> volist = new ArrayList<VendorVo>();
		for(Vendor v : venList) {
			VendorVo vo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
			volist.add(vo);
		}
		return volist;
	}
	
	public VendorVo getById(int id) {
		Vendor v = venrepo.findById(id).get();
		if(v == null) {
			return null;
		}
		VendorVo vo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
		return vo;
	}
	
	public void deleteVendorData(int id) {
		venrepo.deleteById(id);
	}
}

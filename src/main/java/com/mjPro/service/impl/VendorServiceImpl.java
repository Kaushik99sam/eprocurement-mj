package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Rfp;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.RfpRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.VendorService;
import com.mjPro.util.ClassConvertor;

@Service
public class VendorServiceImpl implements VendorService{
	
	@Autowired
	VendorRepo venrepo;
	
	@Autowired
	RfpRepo rfprepo;

	@Override
	public String addData(VendorVo venvo) {
		// TODO Auto-generated method stub
		Rfp rfp = rfprepo.findById(venvo.getRfp().getId()).orElse(null);
		if(rfp != null) {
			RfpVo rfpvo = ClassConvertor.convertTo(rfp, RfpVo.class);
			venvo.setRfp(rfpvo);
			Vendor ven = ClassConvertor.convertTo(venvo, Vendor.class);
			ven.setCreationTime(LocalDateTime.now());
			ven.setUpdationTime(LocalDateTime.now());
			venrepo.save(ven);
			return "Vendor data added successfully!!!";
		}
		return null;
	}

	@Override
	public List<VendorVo> getAll() {
		// TODO Auto-generated method stub
		List<Vendor> venList = venrepo.findAll();
		if(venList != null) {
			List<VendorVo> venvoList = ClassConvertor.convertList(venList, VendorVo.class);
			return venvoList;
		}
		return null;
	}

	@Override
	public VendorVo getById(int id) {
		// TODO Auto-generated method stub
		Vendor ven = venrepo.findById(id).orElse(null);
		if(ven != null) {
			VendorVo venvo = ClassConvertor.convertTo(ven, VendorVo.class);
			return venvo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		// TODO Auto-generated method stub
		venrepo.deleteById(id);
		return "Vendor data deleted successfully!!!";
	}
	
	
}

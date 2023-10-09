package com.mjPro.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.entity.Vendor;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.VendorService;
import com.mjPro.vo.VendorVo;
@Service
public class VendorImpl implements VendorService {

	@Autowired
	VendorRepo vendorRepo;
	@Override
	public List<VendorVo> getAllVendor() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveVendor(VendorVo vendor) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Vendor findVendorById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void editVendor(VendorVo vendor) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteVendor(int id) {
		// TODO Auto-generated method stub
	}

}
package com.mjPro.service;

import java.util.List;

import com.mjPro.entity.Vendor;
import com.mjPro.vo.VendorVo;

public interface VendorService {

	List<VendorVo> getAllVendor();
	void saveVendor(VendorVo vendor);
	VendorVo findVendorById(int id);
	void editVendor(VendorVo vendor);
	void deleteVendor(int id);
}

package com.mjPro.service;

import java.util.List;

import com.mjPro.entity.Vendor;

public interface VendorService {

	List<Vendor> getAllVendor();
	void saveVendor(Vendor vendor);
	Vendor findVendorById(int id);
	void editVendor(Vendor vendor);
	Boolean deleteVendor(int id);
}

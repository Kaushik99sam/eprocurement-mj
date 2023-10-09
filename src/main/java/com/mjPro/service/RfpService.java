package com.mjPro.service;

import java.util.List;

import com.mjPro.entity.Rfp;

public interface RfpService {

	List<Rfp> getAllRfp();
	void saveRfp(Rfp rfp);
	Rfp findRfpById(int id);
	void editRfp(Rfp rfp);
	Boolean deleteRfp(int id);
}

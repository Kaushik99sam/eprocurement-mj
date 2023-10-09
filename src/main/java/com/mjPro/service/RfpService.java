package com.mjPro.service;

import java.util.List;

import com.mjPro.entity.Rfp;
import com.mjPro.vo.RfpVo;

public interface RfpService {

	List<RfpVo> getAllRfp();
	void saveRfp(RfpVo rfp);
	RfpVo findRfpById(int id);
	void editRfp(RfpVo rfp);
	void deleteRfp(int id);
}

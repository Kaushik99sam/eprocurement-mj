package com.mjPro.service.impl;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;

import com.mjPro.repo.RefTableRepo;
import com.mjPro.service.ExcelService;
import com.mjPro.util.ExcelGenerator;

public class ExcelServiceImpl implements ExcelService{
	@Autowired
	RefTableRepo refRepo;

	@Override
	public ByteArrayInputStream getDataToExcel(int id) {
		ByteArrayInputStream excel = ExcelGenerator.dataToExcel(refRepo.findByRfp(id));
		return null;
	}

}

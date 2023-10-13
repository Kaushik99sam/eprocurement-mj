package com.mjPro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjPro.service.impl.CsvFile;
import com.mjPro.service.impl.CsvFileCreator;

@RestController
public class CsvFileController {
	
	@Autowired
	CsvFileCreator csvservice;
	
	@Autowired
	CsvFile csser;
	
	@PostMapping("/csv")
	public void addCsvData() {
		csvservice.csv();
	}

}

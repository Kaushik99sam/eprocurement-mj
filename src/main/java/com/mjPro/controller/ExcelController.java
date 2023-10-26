package com.mjPro.controller;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjPro.service.ExcelService;

@RestController
@CrossOrigin("*")
public class ExcelController {
	@Autowired
	ExcelService excelService;
	
	@RequestMapping("/download-excel/{id}")
	public ResponseEntity<Resource> downloadExcel(@PathVariable Integer id){
		String fileName = "cs.xlsx";
		
		ByteArrayInputStream is = excelService.getDataToExcel(id);
		InputStreamResource isr = new InputStreamResource(is);
		
		return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename="+fileName)
					.contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
					.body(isr);
	}
}

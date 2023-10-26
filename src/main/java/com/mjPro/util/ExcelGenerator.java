package com.mjPro.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.mjPro.entity.Product;
import com.mjPro.entity.RefTable;

public class ExcelGenerator {
	public static String[] Headers = {
			"id",
			"title",
	};
	
	public static String SHEET_NAME = "category_data";
	
	public static ByteArrayInputStream dataToExcel(List<RefTable> refList) {
		List<String> pNames = new ArrayList<String>();
		Map<String, List<Double>> vendorBids = new HashMap<String, List<Double>>();
		Set<Double> estSet = new LinkedHashSet<Double>();
		for(RefTable rt: refList) {
			List<Double> bidList = vendorBids.getOrDefault(rt.getVendor().getName(), new ArrayList<Double>());
			bidList.add(rt.getBidPrice());
			estSet.add(rt.getProduct().getEstPrice());
			vendorBids.put(rt.getVendor().getName(), bidList);
		}
		Workbook workbook = new XSSFWorkbook();
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		
		try {
			//create work book
			
			//create sheet
			Sheet sheet = workbook.createSheet();
			
			//create row
			Row row = sheet.createRow(0);
			
			for(int i=0;i<pNames.size();i++) {
				Cell cell =row.createCell(i+1);
				cell.setCellValue(pNames.get(i));
			}
			
			//value rows
			int rowIndex = 1;
			
//			for(RefTable rt: refList) {
//				Row dataRow = sheet.createRow(rowIndex);
//				
//				dataRow.createCell(0).setCellValue(rt.getVendor().getName());
//				
//				
//			}
			
			for(Map.Entry<String, List<Double>> bidSet : vendorBids.entrySet()) {
				Row dataRow = sheet.createRow(rowIndex);
				dataRow.createCell(0).setCellValue(bidSet.getKey());
				int cellNo = 1;
				for(Double bid: bidSet.getValue()) {
					dataRow.createCell(cellNo).setCellValue(bid);
					cellNo++;
				}
				
				rowIndex++;
			}
			
			Row dataRow = sheet.createRow(rowIndex);
			dataRow.createCell(0).setCellValue("Est Price");
			int cellNo = 1;
			for(Double est: estSet) {
				dataRow.createCell(cellNo).setCellValue(est);
				cellNo++;
			}
			
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
			
		}catch(Exception e) {
			e.printStackTrace();
			System.out.println("fail to import data excel");
		} finally {
			try {
				workbook.close();
				out.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return null;
	}
}

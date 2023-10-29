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
import com.mjPro.entity.Vendor;

public class ExcelGenerator {	
	public static String[] Headers = {
			"id",
			"title",
	};
	
	public static String SHEET_NAME = "category_data";
	
	public static ByteArrayInputStream dataToExcel(List<RefTable> refList) {
		Map<String, List<Double>> vendorBids = new HashMap<String, List<Double>>();
		Set<Double> estSet = new LinkedHashSet<Double>();
		Set<String> pNames = new LinkedHashSet<String>();
		for(RefTable rt: refList) {
			List<Double> bidList = vendorBids.getOrDefault(rt.getVendor().getName(), new ArrayList<Double>());
			bidList.add(rt.getBidPrice());
			estSet.add(rt.getProduct().getEstPrice());
			pNames.add(rt.getProduct().getName());
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
			int i = 0;
			for(String pname: pNames) {
				Cell cell = row.createCell(i+1);
				cell.setCellValue(pname);
				i++;
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
	
	
	public static List<Object> vendorListByProduct(List<RefTable> rl) {
		Map<Product, List<Object>> m = new HashMap<Product, List<Object>>();
		List<Object> ll = new ArrayList<Object>();
		for(RefTable r: rl) {
			List<Object> l = m.getOrDefault(r.getProduct(), new ArrayList<Object>());
			l.add(new VendorWithBid(r.getVendor(),r.getBidPrice(),r.getId()));
			m.put(r.getProduct(),l);
		}
		
		for(Map.Entry<Product, List<Object>> mm : m.entrySet()) {
			ll.add(new Object() {
				
				public Product getProduct() {
					return mm.getKey();
				}
				
				public List<Object> getVendorBid(){
					return mm.getValue();
				}
			});
		}
	
		return ll;
	}
	
	
	private static class VendorWithBid {
		private Vendor vendor; 
		private Double bidPrice;
		private Integer refId;

		public VendorWithBid(Vendor vendor, Double bidPrice,Integer id) {
			this.vendor = vendor;
			this.bidPrice = bidPrice;
			this.refId = id;
			
		}
		
		public Vendor getVendor() {
			return vendor;
		}

		public Double getBidPrice() {
			return bidPrice;
		}
		
		public Integer getRefId() {
			return refId;
		}
	}

}

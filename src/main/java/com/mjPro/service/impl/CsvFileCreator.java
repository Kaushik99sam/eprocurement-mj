package com.mjPro.service.impl;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.entity.Product;
import com.mjPro.entity.RefTable;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.ProductRepo;
import com.mjPro.repo.RefTableRepo;
import com.mjPro.repo.VendorRepo;

@Service
public class CsvFileCreator {

	@Autowired
	ProductRepo prepo;
	
	@Autowired
	VendorRepo venrepo;
	
	@Autowired
	RefTableRepo refrepo;

    public void csv() {
    	
    	
        // Define the file name and path
        String csvFileName = "C:\\Users\\ayush.kumar\\Desktop\\Evaluation_Po_MJPRO\\Eval_PO\\data.csv";

        try {
            // Create a FileWriter object to write to the CSV file
            FileWriter fileWriter = new FileWriter(csvFileName);

            // Create a PrintWriter object to write formatted text to a file
            PrintWriter printWriter = new PrintWriter(fileWriter);

            List<Product> proList = prepo.findAll();
            
            String frow = " ,";
                        
            for(Product p:proList) {
            	frow = frow+p.getName()+",";
            }
            // Write header to the CSV file
            frow = frow + "TotalPrice";
            printWriter.println(frow);
            
            List<Vendor> venList = venrepo.findAll();
            for(Vendor v : venList) { 
            	String body = "";
            	Double totalPrice = 0.0;
            	int ven_id = v.getId();
            	List<RefTable> ref_pro = refrepo.getByVendorId(ven_id);
            	System.out.println(ref_pro);
            	body = body + v.getName()+ ",";
            	for(RefTable obj : ref_pro) {
            		totalPrice = totalPrice + obj.getBidPrice();
            		body = body + obj.getBidPrice() + ",";
            	}
            	body = body + totalPrice;
            	
            	printWriter.println(body);
            	
            }
            
            String estPrice = "Est Price,";
            Double totalEstPrice = 0.0;
            for(Product p : proList) {
            	totalEstPrice = totalEstPrice + p.getEstPrice();
            	estPrice = estPrice + p.getEstPrice() + ",";
            }
            estPrice = estPrice + totalEstPrice;
            printWriter.println(estPrice);
            
            // Close PrintWriter and FileWriter
            printWriter.close();
            fileWriter.close();

            System.out.println("CSV file created successfully.");

        } catch (IOException e) {
            // Handle IO exception
            System.err.println("Error writing to the CSV file: " + e.getMessage());
        }
    }
}

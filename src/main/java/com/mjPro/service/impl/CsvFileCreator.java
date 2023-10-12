package com.mjPro.service.impl;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.entity.Product;
import com.mjPro.entity.RefTable;
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
            List<RefTable> refList = refrepo.findAll();
            
            String frow = "Vendor, ";
                        
            for(Product p:proList) {
            	frow = frow+p.getName()+",";
            }
            // Write header to the CSV file
            printWriter.println(frow);
            
            Map<String,ArrayList<Product>> map = new HashMap<String, ArrayList<Product>>();
            
            for(RefTable rt:refList) {
            	ArrayList<Product> ap = map.getOrDefault(rt.getVendor().getName(), new ArrayList<Product>());
            	ap.add(rt.getProduct());
            	map.put(rt.getVendor().getName(), ap);
            }
            
            Iterator<Map.Entry<String, ArrayList<Product>>> itr = map.entrySet().iterator(); 
            
            while(itr.hasNext()) 
            { 
            	Map.Entry<String, ArrayList<Product>> entry = itr.next(); 
            	String str = entry.getKey() + ",";
//                 System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue()); 
                 ArrayList<Product> al = entry.getValue();
                 
                 for(int i=0; i<al.size(); i++) {
                	 str = str + al.get(i).getEstPrice() + ",";
                 }
                 printWriter.println(str);
            } 

//            // Sample data
//            String[] names = {"Alice", "Bob", "Charlie"};
//            int[] ages = {25, 30, 35};
//            String[] cities = {"New York", "London", "Tokyo"};
//
//            // Write data to the CSV file
//            for (int i = 0; i < names.length; i++) {
//                printWriter.println(names[i] + "," + ages[i] + "," + cities[i]);
//            }

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

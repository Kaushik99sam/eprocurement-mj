package com.mjPro.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RefTable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(length=11 , precision = 2)
	private Double bidPrice;
	
	@ManyToOne
	@JoinColumn(name = "vendor_id")
	Vendor vendor;
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	Product product;
	
	@ManyToOne
	@JoinColumn(name = "rfp_id")
	Rfp rfp; 
	
	@Column(columnDefinition = "TIMESTAMP")
	LocalDateTime creationTime;
	@Column(columnDefinition = "TIMESTAMP")
	LocalDateTime updationTime;
}

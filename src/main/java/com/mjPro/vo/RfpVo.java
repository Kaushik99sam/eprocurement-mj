package com.mjPro.vo;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.mjPro.entity.Vendor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RfpVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer rfp_id;
	private Double est_price;
	private Boolean is_splitable;
	private String status;
	
	private LocalDate creation_date;
	private LocalDate sub_date;
	private LocalDate opening_date;
	
	@OneToMany
	@JoinColumn(name = "rfp_id")
	List<Vendor> venlist;
	
	
}

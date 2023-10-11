package com.mjPro.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rfp {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String status;
	private Boolean isSpilt;
	private String description;
	
	private LocalDate creation_date;
	private LocalDate updation_date;
	
	@OneToOne
	@JoinColumn(name = "indent_id")
	Indent indent;
	
	@OneToMany
	@JoinColumn(name = "rfp_id")
	List<Vendor> venList;
	
	@OneToOne
	@JoinColumn(name = "cs_id")
	Cs cs;
	
}

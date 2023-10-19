package com.mjPro.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
	@Column(length = 25)
	private String status;
	private Boolean isSpilt;
	@Column(length=50)
	private String description;
	
	@OneToOne
	@JoinColumn(name = "indent_id")
	Indent indent;
	
	@Column(columnDefinition = "TIMESTAMP")
	LocalDateTime creationTime;
	@Column(columnDefinition = "TIMESTAMP")
	LocalDateTime updationTime;
	
	
	
}

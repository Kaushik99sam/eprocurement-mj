package com.mjPro.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
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
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Po {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToMany
	@JoinColumn(name = "reftable_id")
	List<RefTable> refTable;
	
	@Column(columnDefinition = "TIMESTAMP")
	LocalDateTime creationTime;
	@Column(columnDefinition = "TIMESTAMP")
	LocalDateTime updationTime;
}

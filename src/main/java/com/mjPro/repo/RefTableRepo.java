package com.mjPro.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.RefTable;

@Repository
public interface RefTableRepo extends JpaRepository<RefTable, Integer> {
	@Query("select r from RefTable r where r.vendor.id = :id ")
	public List<RefTable> getByVendorId(int id);
}

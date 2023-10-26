package com.mjPro.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.Vendor;

@Repository
public interface VendorRepo extends JpaRepository<Vendor, Integer> {
	List<Vendor> findByRfp_Id(Integer id);
}

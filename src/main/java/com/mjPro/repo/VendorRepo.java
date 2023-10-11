package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.Vendor;

@Repository
public interface VendorRepo extends JpaRepository<Vendor, Integer> {

}

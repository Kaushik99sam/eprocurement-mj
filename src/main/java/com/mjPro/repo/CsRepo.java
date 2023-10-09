package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.Cs;

@Repository
public interface CsRepo extends JpaRepository<Cs, Integer>{

}

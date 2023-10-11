package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.Indent;

@Repository
public interface IndentRepo extends JpaRepository<Indent, Integer> {

}

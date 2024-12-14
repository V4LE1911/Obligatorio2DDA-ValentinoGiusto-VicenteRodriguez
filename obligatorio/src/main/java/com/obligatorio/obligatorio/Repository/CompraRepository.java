package com.obligatorio.obligatorio.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obligatorio.obligatorio.Entity.Compra;

public interface CompraRepository extends JpaRepository<Compra, Integer> {
    
}

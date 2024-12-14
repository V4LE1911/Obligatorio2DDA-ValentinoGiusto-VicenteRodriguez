package com.obligatorio.obligatorio.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.obligatorio.obligatorio.Entity.Usuario;

public interface UsuarioRepository extends JpaRepository <Usuario, Integer> {
       @Query("SELECT u FROM Usuario u WHERE TYPE(u) = UsuPremium")
    List<Usuario> findByTipoUsuario(@Param("tipoUsuario") String tipoUsuario);
}

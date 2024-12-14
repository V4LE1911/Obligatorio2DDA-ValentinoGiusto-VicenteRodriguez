package com.obligatorio.obligatorio.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;

@Entity
public class UsuRegular extends Usuario {
    public UsuRegular(int id, String nombre, String correo, LocalDate registro) {
        super(id, nombre, correo, registro);
    }

    public UsuRegular() {
    }
}

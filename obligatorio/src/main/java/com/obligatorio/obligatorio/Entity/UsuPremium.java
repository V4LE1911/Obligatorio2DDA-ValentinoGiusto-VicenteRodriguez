package com.obligatorio.obligatorio.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class UsuPremium extends Usuario {

    @Column
    private LocalDate inicioMembresia;

    public UsuPremium(int id, String nombre, String correo, LocalDate registro, LocalDate inicioMembresia) {
        super(id, nombre, correo, registro);
        this.inicioMembresia = inicioMembresia;
    }

    public LocalDate getInicioMembresia() {
        return inicioMembresia;
    }

    public void setInicioMembresia(LocalDate inicioMembresia) {
        this.inicioMembresia = inicioMembresia;
    }

    public UsuPremium() {
    }
}

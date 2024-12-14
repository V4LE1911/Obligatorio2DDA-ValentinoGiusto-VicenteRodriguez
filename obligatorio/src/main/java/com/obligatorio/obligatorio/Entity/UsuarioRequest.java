package com.obligatorio.obligatorio.Entity;

import java.time.LocalDate;

public class UsuarioRequest {
    private String tipoUsuario; 
    private String nombre;
    private String correo;
    private LocalDate registro;
    private LocalDate inicioMembresia; 

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public LocalDate getRegistro() {
        return registro;
    }

    public void setRegistro(LocalDate registro) {
        this.registro = registro;
    }

    public LocalDate getInicioMembresia() {
        return inicioMembresia;
    }

    public void setInicioMembresia(LocalDate inicioMembresia) {
        this.inicioMembresia = inicioMembresia;
    }
}


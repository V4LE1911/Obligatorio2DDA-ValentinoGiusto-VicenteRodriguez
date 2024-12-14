package com.obligatorio.obligatorio.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true) 
    private String correo;

    @Column(nullable = false)
    private LocalDate registro;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore 
    private List<Compra> historialCompras;

    public Usuario() {}

    public Usuario(int id, String nombre, String correo, LocalDate registro) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.registro = registro;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    @JsonProperty("tipoUsuario")
    public String getTipoUsuario() {
        if (this instanceof UsuPremium) {
            return "premium";
        } else if (this instanceof UsuRegular) {
            return "regular";
        }
        return "desconocido";
    }

    public List<Compra> getHistorialCompras() {
        return historialCompras;
    }

    public void setHistorialCompras(List<Compra> historialCompras) {
        this.historialCompras = historialCompras;
    }
}

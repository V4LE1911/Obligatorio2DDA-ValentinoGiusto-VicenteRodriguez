package com.obligatorio.obligatorio.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE) 
    @JoinColumn(name = "usuario_id", nullable = false) 
    @JsonIgnoreProperties("historialCompras") 
    private Usuario usuario;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
        name = "compra_videojuegos",
        joinColumns = @JoinColumn(name = "compra_id"),
        inverseJoinColumns = @JoinColumn(name = "videojuego_id")
    )
    private List<VideoJuego> videojuegos;

    @Column(nullable = false)
    private LocalDate fechaCompra;

    @Column(nullable = false)
    private double total;

    public Compra() {}

    public Compra(int id, Usuario usuario, List<VideoJuego> videojuegos, LocalDate fechaCompra, double total) {
        this.id = id;
        this.usuario = usuario;
        this.videojuegos = videojuegos;
        this.fechaCompra = fechaCompra;
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<VideoJuego> getVideojuegos() {
        return videojuegos;
    }

    public void setVideojuegos(List<VideoJuego> videojuegos) {
        this.videojuegos = videojuegos;
    }

    public LocalDate getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(LocalDate fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

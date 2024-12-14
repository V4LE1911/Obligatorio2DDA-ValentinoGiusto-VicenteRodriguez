package com.obligatorio.obligatorio.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class VideoJuego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String descripcion;

    @Column
    private int precio;

    @Column
    private String imagen;

    @Column
    private int cantCopias;

    @Column
    private String categoria;

    public VideoJuego(int id, String descripcion, int precio, String imagen, int cantCopias, String categotia){
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.cantCopias = cantCopias;
        this.categoria = categotia;
    }
    public VideoJuego(){

    }

    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion(){
        return descripcion;
    }
    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public int getPrecio() {
        return precio;
    }
    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getImagen(){
        return imagen;
    }
    public void setImagen(String imagen){
        this.imagen = imagen;
    }

    public int getCantCopias() {
        return cantCopias;
    }
    public void setCantCopias(int cantCopias) {
        this.cantCopias = cantCopias;
    }
    
    public String getCategoria(){
        return categoria;
    }
    public void setCategoria(String categoria){
        this.categoria = categoria;
    }

}

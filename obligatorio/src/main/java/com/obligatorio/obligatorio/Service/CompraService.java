package com.obligatorio.obligatorio.Service;

import java.util.List;

import com.obligatorio.obligatorio.Entity.Compra;


public interface CompraService {
    public Compra altaCompra(Compra compra) throws Exception;
    public boolean eliminar(int id);
    public Compra modificar(Compra compra);
    public Compra conseguirCompra(int id);
    public List<Compra> listar();
}

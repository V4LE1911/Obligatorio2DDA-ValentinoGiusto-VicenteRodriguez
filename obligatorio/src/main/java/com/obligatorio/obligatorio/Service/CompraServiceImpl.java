package com.obligatorio.obligatorio.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio.AppException;
import com.obligatorio.obligatorio.Entity.Compra;
import com.obligatorio.obligatorio.Entity.VideoJuego;
import com.obligatorio.obligatorio.Repository.CompraRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CompraServiceImpl implements CompraService {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private VideoJuegoService videoJuegoService;

    @Transactional
    @Override
    public Compra altaCompra(Compra compra) throws AppException, Exception {
        if (compra.getTotal() == 0) {
            throw new AppException("Debe ingresar un usuario y un videoJuego");
        }
        if (compra.getFechaCompra() == null) {
            throw new AppException("Debe ingresar una fecha de compra");
        }
        if (compra.getVideojuegos() == null || compra.getVideojuegos().isEmpty()) {
            throw new AppException("Debe ingresar un VideoJuego");
        }
        for (VideoJuego videojuego : compra.getVideojuegos()) {
            VideoJuego vj = videoJuegoService.conseguirVideoJuego(videojuego.getId());
            if (vj.getCantCopias() <= 0) {
                throw new AppException("No hay suficiente stock para el videojuego");
            }
            vj.setCantCopias(vj.getCantCopias() - 1);
            videoJuegoService.modificar(vj); 
        }
    
        return compraRepository.save(compra);
    }
    

    @Override
    public Compra modificar(Compra c) {
        if (compraRepository.existsById(c.getId())) {
            return compraRepository.save(c);
        }
        return null;
    }

   @Override
    public boolean eliminar(int id) {
        if (compraRepository.existsById(id)) {
            compraRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public Compra conseguirCompra(int id) {
        return compraRepository.findById(id).orElse(null);
    }

    @Override
    public List<Compra> listar() {
        return compraRepository.findAll();
    }
}


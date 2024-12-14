package com.obligatorio.obligatorio.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio.AppException;
import com.obligatorio.obligatorio.Entity.VideoJuego;
import com.obligatorio.obligatorio.Repository.VideoJuegoRepository;

@Service
public class VideoJuegoSerivceImpl implements VideoJuegoService {
    
    @Autowired
    private VideoJuegoRepository videoJuegoRepository;
    
    @Override
    public VideoJuego agregar(VideoJuego v) throws AppException {
        if (v.getDescripcion().isEmpty() || v.getDescripcion() == null) {
            throw new AppException("la descripcion no puede ser nula");
        }
        if (v.getCategoria() == null || v.getCategoria().isEmpty()) {
            throw new AppException("la categoria no puede ser nula");
        }

        if (v.getImagen() == null || v.getImagen().isEmpty()) {
            throw new AppException("la imagen no puede ser nula");
        }
        if (v.getPrecio() == 0) {
            throw new AppException("el precio no puede ser 0");
        }
        return videoJuegoRepository.save(v);
    }

    @Override
    public boolean eliminar(int id) {
        if (videoJuegoRepository.existsById(id)) {
            videoJuegoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public VideoJuego modificar(VideoJuego v) throws AppException {
        if (!videoJuegoRepository.existsById(v.getId())) {
            throw new AppException("El videojuego con el ID proporcionado no existe");
        }
        if (v.getDescripcion().isEmpty() || v.getDescripcion() == null) {
            throw new AppException("la descripcion no puede ser nula");
        }
        if (v.getCategoria() == null || v.getCategoria().isEmpty()) {
            throw new AppException("la categoria no puede ser nula");
        }
        if (v.getImagen() == null || v.getImagen().isEmpty()) {
            throw new AppException("la imagen no puede ser nula");
        }
        if (v.getPrecio() == 0) {
            throw new AppException("el precio no puede ser 0");
        }
        return videoJuegoRepository.save(v);
    }

    @Override
    public VideoJuego conseguirVideoJuego(int id) {
        return videoJuegoRepository.findById(id).orElse(null);
    }

    @Override
    public List<VideoJuego> listar() {
        return videoJuegoRepository.findAll();
    }
}

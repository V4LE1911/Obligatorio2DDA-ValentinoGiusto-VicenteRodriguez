package com.obligatorio.obligatorio.Service;

import com.obligatorio.obligatorio.AppException;
import com.obligatorio.obligatorio.Entity.Usuario;
import com.obligatorio.obligatorio.Repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario agregar(Usuario u) throws AppException{
        if (u.getCorreo().isEmpty()) {
            throw new AppException("el correo no puede estar vacio");
        }
        if (u.getNombre().isEmpty()) {
            throw new AppException("el nombre no puede estar vacio");
        }
        if (u.getTipoUsuario().isEmpty()) {
            throw new AppException("el tipo de usuario no puede estar vacio");
        }
        
        return usuarioRepository.save(u);
    }

    @Override
    public boolean eliminar(int ci) {
        if (usuarioRepository.existsById(ci)) {
            usuarioRepository.deleteById(ci);
            return true;
        }
        return false;
    }

    @Override
    public Usuario modificar(Usuario u) throws AppException{
        if (!usuarioRepository.existsById(u.getId())) {
            return null;
        }
        if (u.getCorreo().isEmpty()) {
            throw new AppException("el correo no puede estar vacio");
        }
        if (u.getNombre().isEmpty()) {
            throw new AppException("el nombre no puede estar vacio");
        }
        if (u.getTipoUsuario().isEmpty()) {
            throw new AppException("el tipo de usuario no puede estar vacio");
        }
        return usuarioRepository.save(u);
        
    }

    @Override
    public Usuario conseguirUsuario(int ci) {
        return usuarioRepository.findById(ci).orElse(null);
    }

    @Override
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @Override
    public List<Usuario> filtrarUsuarios(String tipoUsuario) {
        if (tipoUsuario == null || tipoUsuario.equalsIgnoreCase("todos")) {
            return usuarioRepository.findAll();
        } else {
            return usuarioRepository.findByTipoUsuario(tipoUsuario);
        }
    }
    
}

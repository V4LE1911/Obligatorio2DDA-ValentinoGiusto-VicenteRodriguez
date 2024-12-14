package com.obligatorio.obligatorio.Service;

import java.util.List;

import com.obligatorio.obligatorio.Entity.Usuario;

public interface UsuarioService {
    public Usuario agregar(Usuario u) throws Exception;
    public boolean eliminar(int ci);
    public Usuario modificar(Usuario u)throws Exception;
    public Usuario conseguirUsuario(int ci);
    public List<Usuario> listar();
    List<Usuario> filtrarUsuarios(String tipoUsuario);

}

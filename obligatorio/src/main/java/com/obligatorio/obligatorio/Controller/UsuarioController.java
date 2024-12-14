package com.obligatorio.obligatorio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.obligatorio.obligatorio.AppException;
import com.obligatorio.obligatorio.Entity.UsuPremium;
import com.obligatorio.obligatorio.Entity.UsuRegular;
import com.obligatorio.obligatorio.Entity.Usuario;
import com.obligatorio.obligatorio.Entity.UsuarioRequest;
import com.obligatorio.obligatorio.Service.UsuarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> altaUsuario(@RequestBody UsuarioRequest usuarioRequest) {
        try {
            Usuario usuario;

            if ("premium".equalsIgnoreCase(usuarioRequest.getTipoUsuario())) {
                usuario = new UsuPremium(
                    0, 
                    usuarioRequest.getNombre(), 
                    usuarioRequest.getCorreo(), 
                    usuarioRequest.getRegistro(),
                    usuarioRequest.getInicioMembresia()
                );
            } else if ("regular".equalsIgnoreCase(usuarioRequest.getTipoUsuario())) {
                usuario = new UsuRegular(
                    0, 
                    usuarioRequest.getNombre(), 
                    usuarioRequest.getCorreo(), 
                    usuarioRequest.getRegistro()
                );
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuario inválido");
            }

            Usuario nuevoUsuario = usuarioService.agregar(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);

        }catch (AppException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificacionUsuario(@PathVariable int id, @RequestBody UsuarioRequest usuarioRequest) {
        try {
            Optional<Usuario> usuarioExistente = Optional.ofNullable(usuarioService.conseguirUsuario(id));
            if (!usuarioExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            Usuario usuarioActualizado;
            if ("premium".equalsIgnoreCase(usuarioRequest.getTipoUsuario())) {
                usuarioActualizado = new UsuPremium(
                    id, 
                    usuarioRequest.getNombre(), 
                    usuarioRequest.getCorreo(), 
                    usuarioRequest.getRegistro(),
                    usuarioRequest.getInicioMembresia()
                );
            } else if ("regular".equalsIgnoreCase(usuarioRequest.getTipoUsuario())) {
                usuarioActualizado = new UsuRegular(
                    id, 
                    usuarioRequest.getNombre(), 
                    usuarioRequest.getCorreo(), 
                    usuarioRequest.getRegistro()
                );
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuario inválido");
            }

            Usuario usuarioGuardado = usuarioService.modificar(usuarioActualizado);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioGuardado);
        }catch (AppException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminacionUsuario(@PathVariable int id) {
        try {
            boolean eliminado = usuarioService.eliminar(id);
            if (eliminado) {
                return ResponseEntity.status(HttpStatus.OK).body("Usuario eliminado");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirUsuario(@PathVariable int id) {
        try {
            Usuario usuario = usuarioService.conseguirUsuario(id);
            if (usuario != null) {
                return ResponseEntity.status(HttpStatus.OK).body(usuario);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping
    public ResponseEntity<?> conseguirUsuarios() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.listar());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
    
    @GetMapping("/filtrar")
    public ResponseEntity<?> conseguirUsuariosFiltrados(@RequestParam(required = false) String tipoUsuario) {
        try {
            List<Usuario> usuarios = usuarioService.filtrarUsuarios(tipoUsuario);
            return ResponseEntity.status(HttpStatus.OK).body(usuarios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

}

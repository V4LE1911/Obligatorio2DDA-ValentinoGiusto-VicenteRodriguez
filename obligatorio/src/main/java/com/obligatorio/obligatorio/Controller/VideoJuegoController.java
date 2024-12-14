package com.obligatorio.obligatorio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.obligatorio.obligatorio.AppException;
import com.obligatorio.obligatorio.Entity.VideoJuego;
import com.obligatorio.obligatorio.Service.VideoJuegoService;

@RestController
@RequestMapping("/videoJuego")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoJuegoController {

    @Autowired
    private VideoJuegoService videoJuegoService;

    @PostMapping
    public ResponseEntity<?> altaVideoJuego(@RequestBody VideoJuego videoJuego) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(videoJuegoService.agregar(videoJuego));
        } catch (AppException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @PutMapping
    public ResponseEntity<?> modificacionVideoJuego(@RequestBody VideoJuego videoJuego) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(videoJuegoService.modificar(videoJuego));
        }catch (AppException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminacionVideoJuego(@PathVariable int id) {
        try {
            videoJuegoService.eliminar(id);
            return ResponseEntity.status(HttpStatus.OK).body("Eliminado");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirVideoJuego(@PathVariable int id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(videoJuegoService.conseguirVideoJuego(id));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping
    public ResponseEntity<?> conseguirVideoJuegos() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(videoJuegoService.listar());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
}


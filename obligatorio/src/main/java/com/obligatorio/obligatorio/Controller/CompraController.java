package com.obligatorio.obligatorio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.obligatorio.obligatorio.AppException;
import com.obligatorio.obligatorio.Entity.Compra;
import com.obligatorio.obligatorio.Service.CompraService;


@RestController
@RequestMapping("/compra")
@CrossOrigin(origins = "http://localhost:3000")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PostMapping
    public ResponseEntity<?> altaCompra(@RequestBody Compra compra) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(compraService.altaCompra(compra));
        } 
        catch (AppException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } 
        catch (Exception e) {
        
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> modificacionCompra(@RequestBody Compra compra) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(compraService.modificar(compra));
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminacionCompra(@PathVariable int id) {
        try {
            compraService.eliminar(id);
            return ResponseEntity.status(HttpStatus.OK).body("Compra eliminada");
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirCompra(@PathVariable int id) {
        try {
            Compra compra = compraService.conseguirCompra(id);
            return ResponseEntity.status(HttpStatus.OK).body(compra);
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping
    public ResponseEntity<?> conseguirCompras() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(compraService.listar());
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
}
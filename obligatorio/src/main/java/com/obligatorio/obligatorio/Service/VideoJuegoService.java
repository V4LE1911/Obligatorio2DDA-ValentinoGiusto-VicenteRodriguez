package com.obligatorio.obligatorio.Service;

import java.util.List;
import com.obligatorio.obligatorio.Entity.VideoJuego;

public interface VideoJuegoService {
    
    public VideoJuego agregar(VideoJuego videoJuego) throws Exception;
    public boolean eliminar(int id);
    public VideoJuego modificar(VideoJuego videoJuego) throws Exception ;
    public VideoJuego conseguirVideoJuego(int id);
    public List<VideoJuego> listar();
}

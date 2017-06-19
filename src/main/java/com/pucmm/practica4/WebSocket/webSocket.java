package com.pucmm.practica4.WebSocket;

import com.pucmm.practica4.main.Main;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;


/**
 * Created by anyderre on 18/06/17.
 */
@WebSocket
public class webSocket {
    private String sender, message;
    @OnWebSocketConnect
    public void conectando(Session usuario, String username){
        System.out.println("Conectando usuario: "+ usuario.getLocalAddress().getAddress().toString());
        Main.usuariosConectados.put(usuario, username);
        Main.broadCastMessage(sender="Server", message=(username+ " se junta al chat"));
    }
    @OnWebSocketClose
    public void cerrandoConexion(Session usuario, int statusCode, String message ){
        String username= Main.usuariosConectados.get(usuario);
        System.out.println("Desconectando usuario: "+ usuario.getLocalAddress().getAddress().toString());
        Main.usuariosConectados.remove(usuario);
        Main.broadCastMessage(sender="Server", message=(username+ " ha dejado el chat!"));
    }
    @OnWebSocketMessage
    public void recibiendoMensaje(Session usuario, String message){
        System.out.println("Recibiendo del cliente: "+ usuario.getLocalAddress().getAddress().toString());
        try{
            usuario.getRemote().sendString("Mensaje recibido Cliente");
            Main.broadCastMessage(sender= Main.usuariosConectados.get(usuario), message);
        }catch (IOException iex){
            iex.printStackTrace();
        }
    }
}

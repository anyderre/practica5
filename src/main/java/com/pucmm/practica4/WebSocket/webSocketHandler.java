package com.pucmm.practica4.WebSocket;

import com.pucmm.practica4.main.Main;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;

import java.io.IOException;


/**
 * Created by anyderre on 18/06/17.
 */
@WebSocket
public class webSocketHandler {
    private String sender, message;
    @OnWebSocketConnect
    public void conectando(Session usuario){
        System.out.println("Conectando usuario: "+ usuario.getLocalAddress().getAddress().toString());
        Main.usuariosConectados.put(usuario, "klk");
        Main.createHtmlMessageFromSender(sender="Server", message=(usuario.getLocalAddress().getAddress().toString()+" se junta al chat"));
    }
    @OnWebSocketClose
    public void cerrandoConexion(Session usuario ){
        String username= Main.usuariosConectados.get(usuario);
        System.out.println("Desconectando usuario: "+ usuario.getLocalAddress().getAddress().toString());
        Main.usuariosConectados.remove(usuario);
        Main.createHtmlMessageFromSender(sender="Server", message=(username+" dejo el chat"));
    }
    @OnWebSocketMessage
    public void recibiendoMensaje(Session usuario, String message){
        System.out.println("Recibiendo del cliente: "+ usuario.getLocalAddress().getAddress().toString());
        try{
            usuario.getRemote().sendString("Mensaje recibido Cliente");
            Main.createHtmlMessageFromSender(Main.usuariosConectados.get(usuario), message);
        }catch (IOException iex){
            iex.printStackTrace();
        }
    }
    @OnWebSocketError
        public void error(Session session, Throwable t) {
        Main.usuariosConectados.remove(session);
        System.err.println("Error on session ");
    }
}

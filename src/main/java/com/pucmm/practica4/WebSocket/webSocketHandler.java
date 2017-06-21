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

    /**
     * Una vez conectado el cliente se activa este metodo.
     * @param usuario
     */

    @OnWebSocketConnect
    public void conectando(Session usuario){
        System.out.println("Conectando Usuario: "+usuario.getLocalAddress().getAddress().toString());
        Main.usuariosConectados.add(usuario);
    }

    /**
     * Una vez cerrado la conexión, es ejecutado el metodo anotado
     * @param usuario
     * @param statusCode
     * @param reason
     */
    @OnWebSocketClose
    public void cerrandoConexion(Session usuario, int statusCode, String reason) {
        System.out.println("Desconectando el usuario: "+usuario.getLocalAddress().getAddress().toString());
        Main.usuariosConectados.remove(usuario);
    }

    /**
     * Una vez recibido un mensaje es llamado el metodo anotado.
     * @param usuario
     * @param message
     */
    @OnWebSocketMessage
    public void recibiendoMensaje(Session usuario, String message) {
        System.out.println("Recibiendo del cliente: "+usuario.getLocalAddress().getAddress().toString()+" - Mensaje"+message);

            //Enviar un simple mensaje al cliente que mando al servidor..
            //usuario.getRemote().sendString("Mensaje enviado al Servidor: "+message);
            //mostrando a todos los clientes
            Main.createHtmlMessageFromSender("klk",message);
    }

}
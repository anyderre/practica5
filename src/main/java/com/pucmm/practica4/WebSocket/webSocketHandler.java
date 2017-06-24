package com.pucmm.practica4.WebSocket;

import com.pucmm.practica4.entidades.Usuario;
import com.pucmm.practica4.main.Main;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by anyderre on 18/06/17.
 */
@WebSocket
public class webSocketHandler {

    /**
     * Una vez conectado el cliente se activa este metodo.
     * @param usuario
     */
    private boolean isAdminOrAutor=false;
    private static int user=0;
    public static Map<Session, Boolean> usuariosAdmin = new HashMap<>();
    public static Map<Session, String> usuariosSimple = new HashMap<>();


    @OnWebSocketConnect
    public void conectando(Session usuario){
        System.out.println("Conectando Usuario: "+usuario.getLocalAddress().getAddress().toString());

    }

    /**
     * Una vez cerrado la conexión, es ejecutado el metodo anotado
     * @param usuario
     * @param statusCode
     * @param reason
     */
    @OnWebSocketClose
    public void cerrandoConexion(Session usuario, int statusCode, String reason) {
        Main.usuariosConectados.remove(usuario);
        usuariosAdmin.remove(usuario);
        usuariosSimple.remove(usuario);
    }

    /**
     * Una vez recibido un mensaje es llamado el metodo anotado.
     * @param usuario
     * @param message
     */
    @OnWebSocketMessage
    public void recibiendoMensaje(Session usuario, String message) {
            String [] mes = message.split("~");
            Main.usuariosConectados.put(mes[0],usuario);
            boolean isadmin =false;
            if(mes[1].equals("connect-120lk./,o/h")){
                if(mes[2].equals("1")) {
                    isadmin = true;
                    usuariosAdmin.put(usuario, isadmin);
                    Main.createHtmlMessageFromSender(message, isadmin);
                }else{
                    isadmin=false;
                    usuariosSimple.put(usuario,mes[0]);
                }
            }else{
                if(mes[2].equals("1")) {
                    isadmin = true;
                    usuariosAdmin.put(usuario, isadmin);
                    if(Main.usuariosConectados.get(mes[3])!=null){
                        Main.createHtmlMessageFromSender(message, isadmin);
                    }
                }else{
                    isadmin=false;
                    Main.createHtmlMessageFromSender(message, isadmin);
                }
            }





        System.out.println(usuario);
    }


}
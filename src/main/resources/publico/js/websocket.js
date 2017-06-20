var webSocket;
var reconnect = 5000;

function conectar() {
    // Web socket code
    webSocket = new WebSocket("ws://"+location.hostname+":"+location.port+"/mensajeServidor");
    webSocket.onmessage = function (data) {recibirInformacionServidor(data);}
    webSocket.onopen= function(e){console.log("Conectando - status "+this.readyState);}
    webSocket.onclose= function (e) {console.log("Desconectando - status"+ this.readyState);}
    webSocket.onerror = function (){console.log("Hubo un error al conectar");}
}

function openSocket() {
    if(!webSocket || webSocket.readyState===3){
        conectar();
    }
}


$(document).ready(function(){

    conectar();
    //websocket stuff
    console.info("Iniciando Jquery - Ejemplo Webservices");
    $('.pull-right').click(function () {
        //<h4><i class="fa fa-circle text-green"></i> Jane Smith</h4>
        var $username=$('#nombre').val();
        var $message =$('.message').val()
        webSocket.send($username+" "+$message);

    });

});

function recibirInformacionServidor(mensaje) {
    console.log("Recibiendo informacion del Servidor");
    $('.media').append(
        $('<a>').addClass("pull-left").append($('<img>').addClass('media-object img-circle').source("https://lorempixel.com/30/30/people/1/")).append(
            $('<div>').addClass("media-body")).append($('<h4>').addClass("media-heading").append('Jane Smith')).append(
            $('<span>').addClass("small pull-right").append(new Date())).append(
            $('</p>').append(mensaje.data)));
}
setInterval(openSocket, reconnect);
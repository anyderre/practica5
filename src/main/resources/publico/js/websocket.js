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
    $('#send').click(function () {
        //<h4><i class="fa fa-circle text-green"></i> Jane Smith</h4>
        var $username=$('#nombre').val();
        var $message =$('#message').val()
        webSocket.send($username+"~"+$message);

    });
});

function recibirInformacionServidor(mensaje) {

    console.log("Recibiendo informacion del Servidor");
    if($('#del').length){
        $('#del').hide()
    }
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $('.portlet-body').append(
        $('<div>').addClass('row').append(
            $('<div>').addClass('col-lg-12').append(
                $('<div>').addClass('media').append(
                    $('<a>').addClass('pull-left').append(
                        $('<img>').addClass('media-object img-circle').attr('src','https://lorempixel.com/30/30/people/1/').attr('alt','')
                    ),
                    $('<div>').addClass('media-body').append(
                        $('<h4>').addClass("media-heading").append(mensaje.data.split('~')[0]).append(
                            $('<span>').addClass('small pull-right').append(time)
                        ),
                            $('<p>').append(mensaje.data.split('~')[1])
                        )
                    )
                )
            ),$('<hr>')
        )
    $('textarea#message').val('');
}
setInterval(openSocket, reconnect);




//
// var webSocket;
// var reconnect = 5000;
//
// $(document).ready(function(){
//
//     conectar();
//     //websocket stuff
//     console.info("Iniciando Jquery - Ejemplo Webservices");
//     $('.pull-right').click(function () {
//         //<h4><i class="fa fa-circle text-green"></i> Jane Smith</h4>
//         var $username=$('#nombre').val();
//         var $message =$('#mensajeCliente').val()
//         webSocket.send($username+": "+$message);
//
//     });
//
// });
//
// function recibirInformacionServidor(mensaje) {
//     console.log("Recibiendo informacion del Servidor");
//     $("#media").append(mensaje.data);
//     /*$('#media').append(
//      $('<a>').addClass("pull-left").append($('<img>').addClass('media-object img-circle').append(
//      $('<div>').addClass("media-body")).append($('<h4>').addClass("media-heading").append('Jane Smith')).append(
//      $('<span>').addClass("small pull-right").append(new Date())).append(
//      $('</p>').append(mensaje.data))));*/
// }
//
//
// function conectar() {
//
//     webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/mensajeServidor");
//
//     // Web socket code
//     webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/mensajeServidor");
//     webSocket.onmessage = function (data) {recibirInformacionServidor(data);}
//     /* webSocket.onopen= function(e){console.log("Conectando - status "+this.readyState);}*/
//     /*webSocket.onclose= function (e) {console.log("Desconectando - status"+ this.readyState);}*/
//     webSocket.onclose = function (e) { alert("WebSocket connection closed") };
//     webSocket.onerror = function (e){console.log("Hubo un error al conectar");}
// }
//
// function openSocket() {
//     if(!webSocket || webSocket.readyState===3){
//         conectar();
//     }
// }
//
//
// setInterval(openSocket, reconnect);
var webSocket;
var reconnect = 5000;

function conectar() {
    // Web socket code
    webSocket = new WebSocket("ws://"+location.hostname+":"+location.port+"/mensajeServidor");
    webSocket.onmessage = function (data) {updateChat(data);}
    webSocket.onopen= function(e){console.log("Conectando - status "+this.readyState);}
    webSocket.onclose= function (e) {console.log("Desconectando - status"+ this.readyState);}
    webSocket.onerror = function (){console.log("Hubo un error al conectar");}
}

function openSocket() {
    if(!webSocket || webSocket.readyState===3){
        conectar();
    }
}


$(document).ready(function () {
    $('#Conectar').click(function () {
        var $c= $('#user').val()
        var isAdminOrAutor=1;
        $('.name').append($c);
        var $name="";
        $('.list-group-item').click(function () {
            $name=$(this).val();
        })
        webSocket.send($c+"~"+"dimelo papa"+'~'+isAdminOrAutor+"~"+$name);
    });
});


function updateChat(msg) {
    var data = JSON.parse(msg.data);
    //insert("chat", data.userMessage);
    alert(data.userMessage);
   // recibirInformacionServidor(msg.userMessage);
    if(data.userList.length!==0){
        data.userList.forEach(function (user) {
            $(".userlist").append(
                $('<li>').addClass('list-group-item').append(user))
        });
    }


    return data;
}
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
                        $('<h4>').addClass("media-heading").append(mensaje.split('~')[0]).append(
                            $('<span>').addClass('small pull-right').append(time)
                        ),
                        $('<p>').append(mensaje.split('~')[1])
                    )
                )
            )
        ),$('<hr>')
    )
    $('textarea#message').val('');
    if(mensaje.split('~').length===5){
        alert(mensaje.split("~")[4]);
    }
}


setInterval(openSocket, reconnect);




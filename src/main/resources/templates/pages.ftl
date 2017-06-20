<a class="btn icon-btn btn-default" id="chat" href="#">
    <span class="glyphicon glyphicon-comment"></span> </a>

<div class="container bootstrap snippet">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="portlet portlet-default">
                <div class="portlet-heading">
                    <div class="portlet-title">
                        <input type="text" id="nombre">
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div id="chat" class="panel-collapse collapse in">
                    <div>
                        <div class="portlet-body chat-widget" style="overflow-y: auto; width: auto; height: 300px;">
                            <div class="row">
                                <div class="col-lg-12">
                                    <p class="text-center text-muted small">January 1, 2014 at 12:23 PM</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="media">

                                    </div>
                                </div>
                            </div>
                            <hr>

                        </div>
                    </div>
                    <div class="portlet-footer">
                        <form role="form">
                            <div class="form-group">
                                <textarea class="form-control" class="message" placeholder="Enter message..."></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-default pull-right">Send</button>
                                <div class="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.col-md-4 -->
    </div>
</div>


<#if articulos??>
    <#if articulos?size!=0>
        <#list articulos as articulo>
        <div class="article-container line-content">
            <div class="row">
                <div class="col-md-offset- 2 col-md-9" id="header">
                    <a id="" href="/ver/articulo/${articulo.getId()}">
                        <h3 class="article-title">${articulo.getTitulo()}</h3>
                    </a>
                </div>

            </div>
            <div class="row">
                <div class="col-md-offset-2 col-md-9">
                    <#assign cuerpoArticulo = articulo.getCuerpo()>
                    <#if cuerpoArticulo?length &gt; 70>
                        <#assign maxLength = 70>
                    <#else>
                        <#assign maxLength = cuerpoArticulo?length>
                    </#if>
                    <p class="article-preview">${cuerpoArticulo?substring(0, maxLength)} ...<a href="/ver/articulo/${articulo.getId()}" >Leer mas</a></p>

                    <#assign result =size/5>

                    <p id="cant" style="display: none">${result?ceiling}</p>
                    <p id="size" style="display: none">${size}</p>
                </div>

            </div>

            <div class="row">
                <div class="col-md-offset-8 col-md-4">
                    <p><b>By:</b> <a href="/usuario/${articulo.getAutor().getId()}">${articulo.getAutor().getNombre()} <i class="fa fa-user"></i></a></p>
                </div>

                <#assign articuloEtiqueta = articulo.getEtiquetas()>
                <#if articuloEtiqueta?size != 0>
                    <div class="col-md-offset-1 col-md-6 article-tags">
                        <p>
                        <div >
                            Etiqueta(s) <i class="fa fa-tags"></i>:

                            <#list articuloEtiqueta as etiqueta>
                                <a class="btn icon-btn btn-default" style="color: #ffffff;font-size:14px;margin:4px;background-color:#9d9d9d;"  href="/etiqueta/${etiqueta.getEtiqueta()}/articulos">
                                    <span class="glyphicon glyphicon-tags"></span>${etiqueta.getEtiqueta()}
                                </a>

                            </#list>
                        </div>


                    </div>
                </#if>

            </div>



        </div>

        <br>

        </#list>
    <#else>
        <#if noDatos??>
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-12">
                    <h3>${noDatos}...<a href="/agregar/articulo">Agregar un articlo?
                    </a></h3>
                </div>
            </div>
        </div>
        </#if>
    </#if>
</#if>

<div class="row" id="pagina">
    <div class="col-md-offset-5 col-md-7">
        <ul id="pagin">
        </ul>
    </div>
    <script src='/js/websocket.js' type="text/javascript"></scriptsrc></script>
    <script src='/js/pagination.js' type="text/javascript"></scriptsrc></script>
    <script type="text/javascript">


        $(document).ready(function () {
            $('#chat').click(function () {
                if ( $( ".bootstrap" ).is( ":hidden" ) ) {
                    $(".bootstrap" ).slideDown( "slow" );
                    $(".line-content").fadeTo('slow', 0.5);
                } else {
                    $( ".bootstrap" ).slideUp();
                    $(".line-content").fadeTo('slow',1);
                }
            });

        });

    </script>
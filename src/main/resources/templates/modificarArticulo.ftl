<#include "header.ftl">
<#include "nav.ftl">

<div class="container">

    <div class="caption">
        <h3 style="text-align:center;">Modificar Articulo</h3>
    </div>
    <br>
    <form action="/modificar/${articulo.getId()}/articulo" method="post">

        <div class="row">
            <div class="col-md-offset-4 col-md-5">
                <div class="input-group input-group-md form-group">
                    <span class="input-group-addon" id="sizing-addon1"><i class="	glyphicon glyphicon-tags"></i></span>
                    <input type="text" class="form-control" name="titulo" placeholder="Entre el titulo" id="titulo" aria-describedby="sizing-addon1" value="${articulo.getTitulo()}" required>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-md-offset-4 col-md-5">
                <div class=" form-group">
                    <label for="cuerpo">Cuerpo</label>
                    <textarea type="text" class="form-control" name="cuerpo" placeholder="Entre el cuerpo del articulo" id="cuerpo" aria-describedby="sizing-addon1" rows="5" required>${articulo.getCuerpo()}</textarea>
                </div>
            </div>

        </div>
            <#assign l="">
            <#list etiquetas as et >
                <#assign l= l+et.getEtiqueta()+",">
            </#list>
            <div class="row">
                <div class="col-md-offset-4 col-md-5">
                    <div class=" form-group">
                        <label for="etiqueta">Etiquetas</label>
                        <textarea type="text" class="form-control" name="etiquetas" placeholder="Ej: Carro,Jipeta,Toyota,etc." id="etiqueta" aria-describedby="sizing-addon1" required>${l}</textarea>
                    </div>
                </div>

            </div>

        <div class="row">
            <div class="col-md-offset-4 col-md-5 form-group">
                <button class="btn btn-lg btn-primary btn-block btn-signin form-control" id="IngresoLog" type="submit" >Publicar</button>

            </div>
        </div>
        <br>
    </form>
</div>

<#include "footer.ftl">
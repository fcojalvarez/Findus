<template>
    <div class="containerNosotros">
        <h3 class="titleNosotros">Nosotros</h3>
        <p>Mi pasión por la telefonía móvil comenzó desde muy pequeño, siempre me ha llamado mucho la atención, tanto que desde muy pequeño ya desarmaba ordenadores y todo lo que pillaba para ver como estaba montado y repararlo. 
        En cuanto a la tecnología móvil, al ser el mediano de tres hermanos siempre heredaba el móvil que dejaba el de arriba pero era muy feliz cuando ocurría. Mi primer smartphone fue una Blackberry y desde entonces empecé a  interesarme en las novedades del sector de la telefonía móvil, y es por ello que se ha ido convirtiendo en un hobby. Siempre me ha gustado probar diferentes móviles, personalizarlos… y estar al tanto de las últimas novedades.  Por estas razones he creado Findus.

        Todo esto me ha convertido en un "entendido" del mundo de los smartphones.

        Por lo que siempre he sido el que ha ayudado a mi primo, a mi tía, a mi madre, a mis abuelos o amigos a elegir el mejor móvil que se adecuase a sus necesidades tanto económicas como funcionales. El típico al que suelen pedir opinión los conocidos porque saben que controlas el tema …</p>

        <div class="images">
            <img class="imgNosotros" src="https://quemovilmecompro.net/wp-content/uploads/2018/06/foto2-ABOUT-US.png" alt="Persona enseñando algo en el movil">
            <img class="imgNosotros" src="https://quemovilmecompro.net/wp-content/uploads/2018/06/foto3-ABOUT-US.png" alt="Personas alegres con smartphones">
            <img class="imgNosotros" src="https://quemovilmecompro.net/wp-content/uploads/2018/06/foto4-ABOUT-US.png" alt="Personas con moviles">
        </div>
        <p>
            Es por ello que he decidido intentar ayudar a más gente a elegir el móvil que más se asemeje a sus gustos o necesidades, y siempre recomendar los mejores móviles en relación calidad/precio y no dejándome llevar por las propias marcas de telefonía, teleoperadoras o el marketing.
        </p>
    </div>
</template>

<style>
.containerNosotros{
    padding: 30px;
    margin: 10px;
    line-height: 1.8em;
    text-align: justify;
}
.titleNosotros{
    color: var(--color-primary);
    font-size: 1.3em;
    text-shadow: 1px 1px var(--color-bg);
    margin-bottom: 10px;
}
.images{
    margin: 20px auto;
}
.imgNosotros{
    max-width: 100%;
    border-radius: 10px;
    margin-top: 15px;
}
@media (min-width: 600px){
    .containerNosotros{
        padding: 20px 80px;
        margin: 70px auto 20px;
    }
    .images{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .imgNosotros{
        max-width: 30%;
    }
}
</style>
<template>
    <el-row class="bgFooter">
        <el-col class="links" :xs="24" :md="12">
            <nuxt-link class="linkFooter" :to="'/legal'">Aviso legal</nuxt-link>
            <nuxt-link class="linkFooter" :to="'/nosotros'">Nosotros</nuxt-link>
        </el-col>
        <el-col class="spaceby links" :xs="24" :md="12">
            <a class="linkToLinkedIn linkFooter" target="_blank" href="https://www.linkedin.com/in/fcojalvarez/">Francisco J. Álvarez ©</a> 
        </el-col>
    </el-row>
</template>

<style>
.spaceby{
    margin-top: 15px;
}
.bgFooter{
    width: 100%;
    height: 80px;
    background: var(--color-primary);
    border-top: 1px solid #ccc;
}
.linkToLinkedIn{
    margin: 20px auto 10px auto;
    text-align: center;
    display: block;
}
.linkFooter{
    margin: 0 20px;
    color: var(--color-bg);
    font-size: 1.1em;
}
.linkFooter:hover{
    color: var(--color-bg);
    text-shadow: 1px 1px #fff;
}
.links{
    height: 20px;
    padding: 10px;
    text-align: center;
}
@media (min-width: 600px) {
    .spaceby{
        margin-top: 0;
    }
    .links{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FFEC6B;
    }
    .linkFooter{
        margin: 0;
        padding: 15px 30px;
        cursor: pointer;
    }
    .linkToLinkedIn{
        font-size: 1em;
    }
}
</style>
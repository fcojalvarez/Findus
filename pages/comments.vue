<template>
    <div>
        <FormComment></FormComment>
        <hr>
        <Comments></Comments>
        <hr>
        <Prueba></Prueba>
    </div>
</template>

<script>
import FormComment from '@/components/FormComment'
import Comments from '@/components/Comments'
import Prueba from '@/components/Prueba'

export default {
    components: {
        FormComment,
        Comments,
        Prueba
    }
}
</script>

<style>
hr{
    width: 80%;
    margin: 40px auto;
    height: 1px;
}
</style>
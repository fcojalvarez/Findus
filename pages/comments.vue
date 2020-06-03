<template>
    <div>
        <FormComment></FormComment>
        <hr>
        <Comments></Comments>
    </div>
</template>

<script>
import FormComment from '@/components/FormComment'
import Comments from '@/components/Comments'

export default {
    components: {
        FormComment,
        Comments
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
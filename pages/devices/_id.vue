<template>
    <div>
        <Device :id="id"></Device>
        <FormComment></FormComment>
        <hr>
        <Comments></Comments>
    </div>
</template>

<script>
import Device from '@/components/Device'
import FormComment from '@/components/FormComment'
import Comments from '@/components/Comments'

export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components: {
        Device,
        FormComment,
        Comments
    }
}
</script>

<style>
hr{
    width: 80%;
    margin: 20px auto;
    height: 1px;
}
</style>
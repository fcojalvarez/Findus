<template>
  <div class="container">
    <Page404 v-if="error.statusCode === 404">Page not found</Page404>
  </div>
</template>

<script>
import Page404 from '@/components/Page404'

export default {
    components:{
        Page404
    },
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
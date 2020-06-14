<template>
    <div class="borderContact">
        <el-form class="demo-dynamic" >
            <span class="title">Nombre y apellidos:</span>
            <el-form-item prop="name">
                <el-input class="inputContact" placeholder="Nombre y apellidos" v-model="bodyMessage.fullName"></el-input>
            </el-form-item>
            <span class="title">Email:</span>
            <el-form-item prop="email">
                <el-input class="inputContact" placeholder="Email" v-model="bodyMessage.email"></el-input>
            </el-form-item>
            <span class="title">Mensaje:</span>
            <el-form-item prop="message">
                <el-input class="textareaMessage"
            type="textarea"
            :rows="5"
            placeholder="Mensaje."
            v-model="bodyMessage.message">
            </el-input>
            </el-form-item>
            <el-button class="buttonSend" @click.prevent="contactUs">Enviar</el-button>
        </el-form>
        <div v-show="messageEnd">
            <span class="changePss">Su solicitud ha sido enviada. Intentaremos responder lo antes posible.</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            bodyMessage:{
                fullName: '',
                email: '',
                message: ''
            },
            messageEnd: false
        }
    },
    methods:{
        async contactUs(){
            let newMessage = {
                fullName: this.bodyMessage.fullName,
                email: this.bodyMessage.email,
                message: this.bodyMessage.message
            }

            let sendMessage = await this.$axios.post('contact', newMessage)
            this.bodyMessage = ''
            this.messageEnd = true
            setTimeout(() => {
                this.messageEnd = false
            }, 3000);
        }
    }
}
</script>

<style>
.borderContact{
    border: 2px solid var(--color-primary);
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);   
    border-radius: 5px;
    padding: 30px;
    margin: 20px;
}
.textareaMessage{
    margin: 10px 0;
}
.buttonSend{
    width: 100%;
}
@media (min-width: 640px) {
    .borderContact {
        padding: 40px;
        margin: 80px 180px;
    }
    .title{
        font-size: 0.9em;
    }
    .buttonSend{
        width: 25%;
        display: block;
        margin-left: auto;
    }
}
</style>
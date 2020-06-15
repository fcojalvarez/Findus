<template>
    <div class="borderContact">
        <h2 class="titleContact">Contacta con nosotros</h2>
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
            <span class="changePss resultEndMessage messageOk">Su solicitud ha sido enviada. Intentaremos responder lo antes posible.</span>
        </div>
        <div v-show="errorMessage">
            <span class="changePss resultEndMessage messageError">Todos los campos son obligatorios.</span>
        </div>
        <div v-show="errorEmail">
            <span class="changePss resultEndMessage messageError">Por favor, introduzca un email válido.</span>
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
            messageEnd: false,
            errorMessage: false,
            errorEmail: false
        }
    },
    methods:{
        async contactUs(){
            let newMessage = {
                fullName: this.bodyMessage.fullName,
                email: this.bodyMessage.email,
                message: this.bodyMessage.message
            }

            let validateEmail = this.validatedEmail(newMessage.email)

            if(newMessage.fullName === '' || !validateEmail|| newMessage.message === ''){
                if(!validateEmail){
                    this.errorEmail = true;
                } else {
                    this.errorMessage = true;
                }  
                setTimeout(() => {
                    this.errorMessage = false
                    this.errorEmail = false;
                }, 3000);
                return
            }

            let sendMessage = await this.$axios.post('contact', newMessage)
            this.bodyMessage = ''
            this.messageEnd = true
            setTimeout(() => {
                this.messageEnd = false
                this.$router.push('/')
            }, 3000);
        },
        validatedEmail(email) {     
            const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

            if (emailRegex.test(email)) {
                return true
            } else {
                return false
        }
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
.titleContact{
    font-size: 1.1em;
    margin: 20px 0 20px 20px;
}
.resultEndMessage{
    margin: 10px;
    display: block;
}
.messageError{
    color: rgb(172, 25, 25);
}
.messageOk{
    color: rgb(31, 141, 49);
}
@media (min-width: 640px) {
    .borderContact {
        padding: 40px;
        margin: 50px 80px;
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
@media (min-width: 860px) {
    .borderContact {
        padding: 40px;
        margin: 50px 190px;
    }
}
</style>
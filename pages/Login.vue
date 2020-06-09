<template>
    <Login></Login>
</template>

<script>
import Login from '@/components/Login'
export default {
    components: {
        Login
    }
}
</script>

<style>
.border{
    border: 2px solid var(--color-primary);
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    
    border-radius: 5px;
}
.borderFormRegister{
    padding: 30px 20px;
}
.borderFormLogin{
    padding: 40px;
}
.createAccount, .changePassword{
    font-size: 12px;
    border-bottom: 1px solid var(--color-primary);
    color: #333;
    cursor: pointer;
}
.changePassword{
    font-size: 10px;
    margin-top: 10px;
}
.notLogin, .forgottenPassword{
    font-size: 10px;
    margin-top: 10px;
    color: var(--color-bg);
    text-align: center;
}
.formLog{
    margin-top: 10px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    text-align: left;
}
.formRegister{
    margin-top: 10px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    text-align: left;
}
.title{
    font-size: 14px;
}
span .title{
    color:red;
}
el-input{
    width: 70%;
    margin-bottom: 50px;
}
el-button{
    display:block;
    padding-top: 40px;
}
@media (min-width: 600px) {
    .formLog{
        width: 500px;
        padding: 50px;
    }
    .borderLogin{
        padding: 50px 30px;
    }
    .formRegister{
        width: 350px;
    }
}
@media (min-width: 850px) {
    .formLog{
        width: 500px;
        padding: 50px;
    }
    .borderLogin{
        padding: 50px 30px;
    }
    .borderFormRegister{
        padding: 50px 80px;
    }
    .formRegister{
        width: 500px;
        margin: 30px 0;
    }
}
</style>
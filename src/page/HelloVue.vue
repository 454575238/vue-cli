<template>
    <div class="hello-vue">
        {{hello}}
        <button class="btn">
            <span>登录</span>
        </button>
        <input v-model="a" type="text" name="">
    </div>
</template>
<script>
export default{
    data(){
        return{
            hello:"Hello",
            world:"World"
        }
    },
    computed:{
        a:{
            get(){
               return this.hello
            },
            set(newValue){
               this.hello = newValue
            }
        }
    },
    methods:{

    }
}
</script>
<style type="text/css" scoped lang="less">
    .btn{
        border:none;
        width:100px;
        span{
            color:red;
        }
    }
</style>
<template lang="pug">
.login-layout
  form.form
    .input-caption 아이디
    q-input(
      ref="emailRef"
      v-model="email" 
      type="email" 
      outlined
      lazy-rules
      :rules="[ emailValid ]"
    ) 
      template(v-slot:append)
        q-icon(name="alternate_email")

    .input-caption 비밀번호
    q-input(
      ref="passwordRef"
      v-model="password" 
      type="password" 
      placeholder="6자리 이상" 
      outlined 
      lazy-rules
      :rules="[ passwordValid ]"
    ) 
      template(v-slot:append)
        q-icon(name="lock")
    .btn-wrap
      q-btn.sign-in-btn( unelevated label="로그인" @click="signInBtn")
      q-btn.sign-up-btn( unelevated outline label="회원가입" @click="signUpBtn")
</template>

<script>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {

  setup(props) {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter()

    const email = ref(null)
    const password = ref(null)

    const emailRef = ref(null)
    const passwordRef = ref(null)

    const emailValid = (val) => {
      if(val == null || val.length < 1){
        return '이메일을 입력해 주세요.'
      }
      const regx = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/i
      return regx.test(val) || '이메일을 정확하게 입력해 주세요.'
    }

    const passwordValid = (val) => {
      if(val == null || val.length < 1){
        return '비밀번호를 입력해 주세요.'
      }
    }

    const signUpBtn = async () => {

      emailRef.value.validate()
      passwordRef.value.validate()
      
      if (emailRef.value.hasError || passwordRef.value.hasError) {
        return 
      }

      const { result, msg } = await $store.dispatch('auth/signUp', {
        email: email.value,
        password: password.value
      })

      if(!result) {
        $q.notify({
          color: 'negative',
          message: msg
        })
      } else {
        $q.notify({
          message: '회원가입이 완료되었습니다.'
        })
      }
      
    }

    const signInBtn = async () => {
      emailRef.value.validate()
      passwordRef.value.validate()
      
      if (emailRef.value.hasError || passwordRef.value.hasError) {
        return 
      }

      const { result, msg } = await $store.dispatch('auth/signIn', {
        email: email.value,
        password: password.value
      })

      if(!result) {
        $q.notify({
          color: 'negative',
          message: msg
        })
      } else {
        $router.push({ name: 'Admin' })
      }
    }


    return {
      email,
      password,
      emailRef,
      passwordRef,
      
      emailValid,
      passwordValid,

      signUpBtn,
      signInBtn,
      
    }
  }
  // data() {
  //   return {
  //     userId: '',
  //     password: '',
  //   }
  // },

  // methods: {
  //   ...mapActions({
  //     signUp: 'auth/signUp',
  //     signIn: 'auth/signIn',
  //   }),

  //   signUpBtn() {
  //     this.signUp({
  //       email: this.userId,
  //       password: this.password,
  //     })
  //   }
  // },
}
</script>

<style lang="scss" scoped>
@import '/src/css/app.scss';

.login-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e7e7e7;
  

  .form {
    background: white;
    padding: 24px;
    border-radius: 16px;
    @include tablet { min-width: 50vw;}
    @include desktop { min-width: 30vw;}
    @include mobile { width: 95%; }
    .input-caption{ margin: 8px 0;}
    .btn-wrap {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      .sign-in-btn {
        background: $primary;
        color: white;
        margin: 7px 0;
        font-size: 1rem;
        padding: 14px;
      }
      .sign-up-btn {
        color: $primary;
        margin: 7px 0;
        margin: 7px 0;
        font-size: 1rem;
        padding: 14px;
      }
    }
    
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import type { ILogin } from './auth-types'
import { reactive } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Error from '../../components/Error.vue'
import { loginUserHttp } from './actions/LoginUser'
import BaseBtn from '@/components/BaseBtn.vue'
import { showError } from '@/helper/Toastnotifcation'

const loginInput = ref({
  email: '',
  password: ''
})

const rules = {
  email: { email, required }, // Matches state.firstName
  password: { required } // Matches state.lastName
}

const v$ = useVuelidate(rules, loginInput)
const loadingStatus = ref(false)

async function loginUser() {
  const result = await v$.value.$validate()
  if (!result) return
  try {
    loadingStatus.value = true
    const data = await loginUserHttp(loginInput.value)

    // Save user data to local storage and redirect to admin page
    localStorage.setItem('userData', JSON.stringify(data))
    window.location.href = '/admin'

    loadingStatus.value = false
    console.log(data)
  } catch (error: any) {
    loadingStatus.value = false
    showError(error.message)
    //console.log(error.message)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h4>Login</h4>
          <router-link to="/register">register</router-link>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <Error inputLabel="Email" :formErrors="v$.email.$errors">
              <input type="text" v-model="loginInput.email" class="form-control" />
            </Error>

            <Error inputLabel="Password" :formErrors="v$.password.$errors">
              <input type="password" v-model="loginInput.password" class="form-control" />
            </Error>

            <div class="form-group">
              <BaseBtn label="Login" :loading="loadingStatus" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-2"></div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import type { IRegisterInput } from './auth-types'
import { reactive } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Error from '../../components/Error.vue'
import { createUserHttp } from './actions/RegisterUser'
import { showError, successMsg } from '@/helper/Toastnotifcation'
import BaseBtn from '@/components/BaseBtn.vue'

const registerInput = ref<IRegisterInput>({
  name: '',
  email: '',
  password: ''
})

const rules = {
  name: { required }, // Matches state.firstName
  password: { required }, // Matches state.lastName
  email: { email } // Matches state.lastName
}

const v$ = useVuelidate(rules, registerInput)

const loadingStatus = ref(false)

const registerUser = async () => {
  //console.log(registerInput.value)
  const result = await v$.value.$validate()
  if (!result) return
  try {
    loadingStatus.value = true
    const data = await createUserHttp(registerInput.value)
    console.log(data)
    v$.value.$reset()
    registerInput.value = {} as IRegisterInput
    loadingStatus.value = false
    successMsg(data.message)
  } catch (error) {
    console.log(error)
    loadingStatus.value = false
    for (const message of error as string[]) {
      showError(message)
      console.log(message)
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h4>Register</h4>
          <router-link to="/">Login</router-link>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
            <Error inputLabel="Name" :formErrors="v$.name.$errors">
              <input type="text" v-model="registerInput.name" class="form-control" />
            </Error>

            <Error inputLabel="E-mail" :formErrors="v$.email.$errors">
              <input type="text" v-model="registerInput.email" class="form-control" />
            </Error>

            <Error inputLabel="Password" :formErrors="v$.password.$errors">
              <input type="password" v-model="registerInput.password" class="form-control" />
            </Error>

            <div class="form-group">
              <BaseBtn label="Register" :loading="loadingStatus" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-2"></div>
  </div>
</template>





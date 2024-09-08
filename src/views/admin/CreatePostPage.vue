<script setup lang= "ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { reactive } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Error from '../../components/Error.vue'
import type { ICreatePostInput } from './admin-types'
import { createPostHttp } from './actions/CreatePost'
import { showError, successMsg } from '@/helper/Toastnotifcation'
import BaseBtn from '@/components/BaseBtn.vue'

const postInput: ICreatePostInput = ref({
  title: '',
  post_content: ''
})

const rules = {
  title: { required },
  post_content: { required }
}

const v$ = useVuelidate(rules, postInput)
const loadingStatus = ref(false)

async function createPost() {
  //console.log('postInput', postInput.value)
  const result = await v$.value.$validate()
  if (!result) return
  try {
    loadingStatus.value = true
    const data = await createPostHttp({
      title: postInput.value.title,
      post_content: postInput.value.post_content
    })
    loadingStatus.value = false
    // type assertion
    postInput.value = {} as ICreatePostInput
    v$.value.$reset()
    successMsg(data.message)
  } catch (error: any) {
    loadingStatus.value = false
    console.log(error)
    for (const key in error) {
      showError(error[key])
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
          <h4>Create Post</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="createPost">
            <Error inputLabel="Title" :formErrors="v$.title?.$errors" />
            <input type="text" id="title" v-model="postInput.title" class="form-control" />
            <Error />

            <Error inputLabel="Post Content" :formErrors="v$.post_content?.$errors" />
            <textarea
              id="post_content"
              v-model="postInput.post_content"
              class="form-control"
              rows="5"
            ></textarea>
            <Error />

            <br />
            <router-link to="/post-lists">all posts</router-link>
            <br />

            <div class="form-group">
              <BaseBtn label="Create Post" :loading="loadingStatus" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 20px;
}

.card-header {
  background-color: #f5f5f5;
}

.card-body {
  padding: 20px;
}
</style>

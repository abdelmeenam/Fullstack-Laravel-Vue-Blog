<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getPostsHttp } from './actions/GetPosts'
import { _debounce } from '../../helper/util'
import { Bootstrap4Pagination } from 'laravel-vue-pagination'
import { confirmDeletion } from '../../helper/SweetAlert'
import { DeletePostsHttp } from './actions/DeletePost'
import { successMsg } from '../../helper/Toastnotifcation'

const posts = ref()

// paagination and search params
const query = ref<string>('')
const loadingStatus = ref(false)

const showPosts = async (page = 1, query) => {
  const data = await getPostsHttp(page, query)
  posts.value = data
}

onMounted(async () => {
  await showPosts(1, query.value)
})

const search = _debounce(async function () {
  showPosts(1, query.value)
}, 500)

async function removePost(id: number) {
  confirmDeletion()
    .then(async () => {
      const data = await DeletePostsHttp(id)
      successMsg(data?.message)
      showPosts(1, query.value)
    })
    .catch(() => {
      console.log('cancel deletion')
    })
}
</script>

<template>
  <div class="col-md-2"></div>
  <div class="col-md-8">
    <div class="card">
      <div class="card-header">
        <h4 class="d-inline">Post List</h4>

        <RouterLink to="/create-post" style="float: right" class="btn btn-primary">
          <b>+</b> New Post</RouterLink
        >
      </div>
      <div class="card-body">
        <div class="row mb-2">
          <div class="col-md-4 p-1">
            <input
              type="text"
              @keydown="search"
              v-model="query"
              class="form-control"
              placeholder="search..."
            />
            <span v-if="loadingStatus" style="color: blue"> <b>Loading.....</b> </span>
          </div>

          <div class="col-md-8 p-1">
            <select class="form-select" aria-label="Default select example">
              <option selected>Filter by category</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
          </div>
        </div>

        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <td>ID</td>
              <td>Image</td>
              <td>Post title</td>
              <td>Post content</td>
              <td>Upload</td>

              <td>Update</td>
              <td>Delete</td>
            </tr>
          </thead>

          <tbody v-for="post in posts?.data" :key="post.id">
            <tr>
              <td>{{ post.id }}</td>
              <td>
                <img :src="post.image" style="height: 55px; height: 55px" alt="image" />
              </td>

              <td>{{ post.title }}</td>
              <td>{{ post.post_content }}</td>
              <td>
                <button class="btn btn-outline-secondary btn-sm" @click="showModal(post.id)">
                  Upload-image
                </button>
              </td>

              <td><button class="btn btn-outline-primary btn-sm">Update</button></td>
              <td>
                <button class="btn btn-outline-danger btn-sm" @click="removePost(post.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Bootstrap4Pagination
          class="d-flex justify-content-center"
          :data="{
            current_page: posts?.current_page,
            last_page: posts?.last_page,
            to: posts?.to,
            total: posts?.total
          }"
          @pagination-change-page="showPosts"
        />
      </div>
    </div>
  </div>
  <div class="col-md-2"></div>
</template>
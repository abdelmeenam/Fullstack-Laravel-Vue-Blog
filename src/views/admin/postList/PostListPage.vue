<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getPostsHttp, GetPostsResponseType } from './actions/GetPosts'
import { openModal, _debounce, closeModal } from '../../../helper/util'
import { Bootstrap4Pagination } from 'laravel-vue-pagination'
import { confirmDeletion } from '../../../helper/SweetAlert'
import { DeletePostsHttp } from './actions/DeletePost'
import { successMsg } from '../../../helper/Toastnotifcation'
import PostTable from './components/PostTable.vue'
import UploadImageModal from './components/UploadImageModal.vue'

const posts = ref<GetPostsResponseType>()
const query = ref<string>('')
const loadingStatus = ref(false)
const currentPostId = ref<number>(0)

async function showPosts(page = 1, query = '') {
  const data = await getPostsHttp(page, query)
  console.log(data)
  posts.value = data
}

// to prevent multiple api calls on keydown
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

const showModal = (postId: number) => {
  currentPostId.value = postId
  openModal(currentPostId, 'postModal')
}

onMounted(async () => {
  await showPosts()
})
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
        <UploadImageModal
          :postId="currentPostId"
          @refreshTable="showPosts"
          @closeModal="closeModal('postModal')"
        />
        <PostTable :posts="posts" @removePost="removePost" @showModal="showModal" />
        <div v-if="posts">
          <Bootstrap4Pagination :data="posts" @pagination-change-page="showPost" />
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-2"></div>
</template>
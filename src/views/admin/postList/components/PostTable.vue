
<script setup lang="ts" >
import { GetPostsResponseType } from '../actions/GetPosts'

defineProps<{
  posts: GetPostsResponseType | undefined
}>()

const emit = defineEmits<{
  (e: 'removePost', postId: number): void
  (e: 'showModal', postId: number): void
}>()
</script>
<template>
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
          <button class="btn btn-outline-secondary btn-sm" @click="emit('showModal', post.id)">
            Upload
          </button>
        </td>

        <td><button class="btn btn-outline-primary btn-sm">Update</button></td>
        <td>
          <!-- <button class="btn btn-outline-danger btn-sm" @click="removePost(post.id)">Delete</button> -->
          <button class="btn btn-outline-danger btn-sm" @click="emit('removePost', post.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

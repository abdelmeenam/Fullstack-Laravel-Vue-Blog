<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getUserData } from '../../helper/getUserData'
import { APP } from '../../shared/App'
import { logoutUserHttp } from './actions/LogoutUser'
import { successMsg } from '../../helper/Toastnotifcation'
import { onMounted } from 'vue'
import { userIsLoggedInPostHttp } from './actions/UserIsLoggedIn'

const userData = getUserData()

async function logoutUser() {
  const userId = userData?.user?.id
  if (typeof userId !== 'undefined') {
    const data = await logoutUserHttp(userId)
    localStorage.removeItem(userData)
    successMsg(data.message)
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }
}

async function userIsLoggedIn() {
  try {
    await userIsLoggedInPostHttp()
  } catch (error: any) {
    console.log(error.message)
    if (error.message === 'Unauthenticated.') {
      window.location.href = '/'
    }
  }
}

// Before the component is mounted we check if the user is logged in
onMounted(async () => {
  await userIsLoggedIn()
})
</script>

<template>
  <div class="conatiner">
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #e3f2fd">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page" to="/admin">Dashbaord</RouterLink>
            </li>
            <li class="nav-item" style="font-weight: bold">
              <RouterLink class="nav-link" to="/create-post">Create-post</RouterLink>
            </li>
            <li class="nav-item" style="font-weight: bold">
              <RouterLink class="nav-link" to="/post-lists">Post-lists</RouterLink>
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="navbar-text">
                  <b>Hello , {{ userData?.user?.name }}</b>
                </span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#" @click="logoutUser">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br />
    <br />

    <div class="row">
      <RouterView />
    </div>
  </div>
</template>

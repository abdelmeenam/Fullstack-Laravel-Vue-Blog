<script setup lang="ts">
import { defineProps } from 'vue'
import type { ErrorObject } from '@vuelidate/core'

const props = defineProps<{
  inputLabel?: string
  formErrors?: ErrorObject[]
}>()
</script>

<template>
  <!-- <div :class="{ error: v$.name.$errors.length }" class="form-group row">
    <label for="">Name</label>
    <input type="text" v-model="registerInput.name" class="form-control" />
    <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div> -->

  <div :class="{ error: props.formErrors }" class="form-group row">
    <label for=""> {{ props.inputLabel }} </label>
    <slot></slot>
    <div class="input-errors" v-for="error of props.formErrors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>


<style scoped>
.input-errors {
  color: red;
  font-size: 12px;
}
</style>

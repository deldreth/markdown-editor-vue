<template>
  <form class="note-search" novalidate @submit="onSubmit">
    <div class="input-group mb-4">
      <input
        v-model="searchInput"
        aria-label="Search Notes"
        aria-placeholder="Search Notes"
        class="search-input form-control rounded-full"
        placeholder="Search"
        type="text"
        @blur="onBlur"
      />
      <button
        v-if="searchInput"
        class="btn btn-primary rounded-full"
        type="button"
        @click="onClear"
      >
        <FontAwesomeIcon icon="times" />
      </button>
      <button class="btn btn-primary rounded-full px-4" type="submit">
        <FontAwesomeIcon icon="search" />
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onSearch']);

const searchInput = ref('');

function onSubmit(event) {
  event.preventDefault();
  emit('onSearch', searchInput.value);
}

function onClear(event) {
  searchInput.value = '';
  emit('onSearch', '');
  document.querySelector('.search-input').focus();
}

function onBlur(event) {
  if (searchInput.value === '') {
    emit('onSearch', '');
  }
}
</script>

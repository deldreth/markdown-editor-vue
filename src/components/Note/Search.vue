<template>
  <form class="note-search" novalidate @submit="onSubmit">
    <div class="input-group px-4 pt-4">
      <input
        v-model="searchInput"
        aria-label="Search Notes"
        aria-placeholder="Search Notes"
        class="search-input form-control rounded-md p-2"
        placeholder="Search"
        type="text"
        @blur="onBlur"
        @input="onChange"
      />
      <FormButton v-if="searchInput" @click="onClear">
        <FontAwesomeIcon class="mx-2" icon="times" />
      </FormButton>
      <FormButton type="submit">
        <FontAwesomeIcon class="mx-2" icon="search" />
      </FormButton>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onSearch']);

const searchInput = ref('');

function onChange(event) {
  event.preventDefault();
  if (event.target.value === '') {
    emit('onSearch', '');
  }
}

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

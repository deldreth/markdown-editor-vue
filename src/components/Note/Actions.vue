<template>
  <div class="btn-group">
    <FormButton
      type="button"
      class="dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Actions
    </FormButton>
    <ul class="dropdown-menu">
      <!-- <li>
        <a class="dropdown-item cursor-pointer" @click="download">
          <FontAwesomeIcon icon="file-export" class="mr-2" />Export to HTML
        </a>
      </li>
      <li><hr class="dropdown-divider" /></li> -->
      <li>
        <a
          class="dropdown-item"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#note-delete-modal"
        >
          <FontAwesomeIcon icon="trash" class="mr-2" />Delete</a
        >
      </li>
    </ul>
  </div>

  <NoteDeleteModal id="note-delete-modal" />
</template>

<script setup>
import { inject } from 'vue';

const note = inject('note');

function download() {
  var pom = document.createElement('a');
  pom.setAttribute(
    'href',
    'data:text/html;charset=utf-8,' + encodeURIComponent(note.value.body)
  );
  pom.setAttribute('download', note.value.name);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}
</script>

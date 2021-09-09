<template>
  <div :id="props.id" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div
        class="
          modal-content
          border border-indigo-400
          bg-indigo-900 bg-opacity-75
        "
      >
        <div class="modal-header">
          <h5 class="modal-title text-xl">{{ props.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

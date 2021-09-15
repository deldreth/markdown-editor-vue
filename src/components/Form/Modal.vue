<template>
  <div :id="props.id" class="modal" tabindex="-1">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div
        class="
          modal-content
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

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
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

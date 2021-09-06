<template>
  <div class="p-2 sticky top-0 bg-gray-900 border-b border-pink-500">
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#group-edit-modal"
      class="btn btn-link text-2xl p-2 truncate w-full text-left"
    >
      <FontAwesomeIcon icon="layer-group" class="mr-4" /><slot></slot>
    </button>
  </div>
</template>

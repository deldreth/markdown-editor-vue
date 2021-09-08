<template>
  <div class="p-4 pl-8 pr-8 sticky top-0 border-b-2 border-indigo-400">
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

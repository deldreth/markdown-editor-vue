<template>
  <div class="form-floating mb-6">
    <input
      type="text"
      class="form-control"
      :disabled="props.disabled"
      :placeholder="placeholder"
      :required="props.required"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="form-label">{{ props.label }}</label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);

const placeholder = ref(props.placeholder || props.label);
</script>

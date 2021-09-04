<template>
  <LayoutAuth>
    <form
      ref="signinForm"
      class="needs-validated"
      novalidate
      @submit="onSubmit"
    >
      <section
        v-if="$route.params.confirm"
        class="mb-12 bg-green bg-opacity-25 p-4 border border-green rounded"
      >
        <h1 class="text-xl">Account Confirmed!</h1>
        <p>Please log in with your credentials.</p>
      </section>

      <div class="form-floating mb-8">
        <input
          v-model="username"
          type="text"
          class="form-control"
          required
          placeholder="awesome"
        />
        <label class="form-label">Username</label>
      </div>

      <div class="form-floating mb-8">
        <input
          v-model="password"
          type="password"
          class="form-control"
          required
          placeholder="Password"
        />
        <label class="form-label">Password</label>
        <div class="invalid-feedback">Incorrect username or password.</div>
      </div>

      <div class="flex justify-end items-center">
        <!-- <a href="" class="mr-8">Forgot Password</a> -->
        <button type="submit" class="btn btn-success loading">Log In</button>
      </div>
    </form>

    <hr class="w-full mb-8 mt-8" />

    <a href="/auth/signup" type="button" class="btn btn-secondary block"
      >Create New Account</a
    >
  </LayoutAuth>
</template>

<script setup>
import { ref } from 'vue';
import { Auth } from 'aws-amplify';
import { useRouter } from 'vue-router';

const router = useRouter();

const signinForm = ref(null);
const username = ref('');
const password = ref('');

async function onSubmit(event) {
  event.preventDefault();

  const passwordField = signinForm.value.querySelector(
    'input[type="password"]'
  );
  const submitButton = signinForm.value.querySelector('button[type="submit"]');

  try {
    signinForm.value.classList.remove('was-validated');
    passwordField.classList.remove('is-invalid');
    submitButton.classList.add('disabled');

    if (!signinForm.value.checkValidity()) {
      signinForm.value.classList.add('was-validated');
    } else {
      await Auth.signIn(username.value, password.value);

      router.replace('/');
    }
  } catch (e) {
    passwordField.classList.add('is-invalid');
  }

  submitButton.classList.remove('disabled');
}
</script>

<template>
  <LayoutAuth>
    <section
      v-if="errorMessage"
      class="mb-12 bg-red bg-opacity-25 p-4 border border-red rounded"
    >
      <h1 class="text-xl">Issue Creating Account</h1>
      <p>{{ errorMessage }}</p>
    </section>

    <form ref="signupForm" class="signup-form" novalidate @submit="onSignup">
      <div class="form-floating mb-8">
        <input
          id="email"
          v-model="email"
          type="text"
          class="email-input form-control"
          required
          placeholder="awesome@email.com"
        />
        <label for="email" class="form-label">Email</label>
      </div>

      <div class="form-floating mb-8">
        <input
          v-model="username"
          type="text"
          class="username-input form-control"
          required
          placeholder="awesome"
        />
        <label class="form-label">Username</label>
      </div>

      <div class="form-floating mb-8">
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
          required
          minlength="8"
          placeholder="Awe$some Pas8"
        />
        <label for="password" class="form-label">Password</label>
        <div class="form-text">Minimum password length is 8.</div>
      </div>

      <div class="form-floating mb-10">
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="form-control"
          required
          minlength="8"
          placeholder="Awe$some Pas8"
        />
        <label for="confirmPassword" class="form-label">Confirm Password</label>
      </div>

      <div class="flex justify-end items-center">
        <button type="submit" class="btn btn-success">Create Account</button>
      </div>
    </form>
  </LayoutAuth>
</template>

<script setup>
import { ref } from 'vue';
import { Auth } from 'aws-amplify';
import { useRouter } from 'vue-router';

const router = useRouter();

const signupForm = ref(null);
const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupSuccess = ref(false);
const errorMessage = ref('');

async function onSignup(event) {
  event.preventDefault();

  const submitButton = signupForm.value.querySelector('button[type="submit"]');

  try {
    submitButton.classList.add('disabled');

    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords must match.');
    }

    if (!signupForm.value.checkValidity()) {
      signupForm.value.classList.add('was-validated');
      submitButton.classList.remove('disabled');
    } else {
      const user = await Auth.signUp({
        username: username.value,
        password: password.value,
        attributes: {
          email: email.value,
        },
      });

      submitButton.classList.remove('disabled');

      router.push({
        name: 'confirm',
        params: { email: email.value, username: username.value },
      });

      password.value = '';
      confirmPassword.value = '';
      signupSuccess.value = true;
    }
  } catch (e) {
    submitButton.classList.remove('disabled');
    errorMessage.value = e.message;
  }
}
</script>

<template>
  <LayoutAuth
    class="
      flex flex-col
      justify-center
      items-center
      bg-gradient-to-b
      from-indigo-800
      h-screen
      text-white
    "
  >
    <form class="confirm-form" @submit="onConfirm">
      <section v-if="username" class="mb-12">
        <h1 class="text-xl">Your account has been created!</h1>
        An email with a verification code was just sent to
        <b>{{ $route.params.email }}</b
        >.
      </section>
      <section v-else class="mb-12">
        <h1 class="text-xl">Verify Your Account</h1>
        Enter your username and the verification code that was sent to your
        email address.
      </section>

      <div v-if="!username" class="form-floating mb-8">
        <input
          id="username"
          v-model="username"
          type="text"
          class="form-control"
          placeholder="Username"
        />
        <label for="username" class="form-label">Username</label>
      </div>

      <div class="form-floating mb-8">
        <input
          id="code"
          v-model="code"
          type="text"
          class="form-control"
          placeholder="Verification Code"
        />
        <label for="code" class="form-label">Verification Code</label>
      </div>

      <div class="flex justify-end items-center">
        <button type="submit" class="btn btn-success">Confirm Account</button>
      </div>
    </form>
  </LayoutAuth>
</template>

<script setup>
import { ref } from 'vue';
import { Auth } from 'aws-amplify';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const username = ref(route.params.username);
const code = ref('');

async function onConfirm(event) {
  event.preventDefault();

  try {
    await Auth.confirmSignUp(username.value, code.value);

    router.replace({ name: 'login', params: { confirm: true } });
  } catch (e) {}
}
</script>

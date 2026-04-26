<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Header />

    <main class="grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div v-if="!loading"
        class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div class="px-6 pt-10 pb-8 text-center sm:px-10 shrink-0">
          <div
            class="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/10">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
            Verifica tu cuenta
          </h1>
          <Alert v-if="alertMessage.msg" :error="true" :msg="alertMessage.msg" />
        </div>

        <div class="px-6 pb-10 sm:px-10 shrink-0">

          <div class="flex justify-center gap-2 sm:gap-3">
            <p>
              Hemos enviado un correo de confirmación a tu dirección de email. Por favor, revisa tu bandeja de entrada y
              haz clic en el enlace de verificación para activar tu cuenta.
            </p>
          </div>

          <div class="mt-8 pt-6 border-t border-slate-200 space-y-3 text-center">
            <RouterLink :to="{ name: 'login' }"
              class="font-medium text-sm text-slate-500 hover:text-primary focus:outline-none focus:underline transition-colors inline-flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio de sesión
            </RouterLink>
          </div>
        </div>

      </div>
      <div v-else
        class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 text-center">
        <svg class="w-12 h-12 text-primary animate-spin mx-auto mb-4" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4v1m0 8v1m0 8v1m0-16a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm0 8a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm0 8a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" />
        </svg>
        <p class="text-sm text-slate-500">Verificando tu cuenta, por favor espera...</p>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';
import useAuthStore from '@/store/auth';

const route = useRoute();

const authStore = useAuthStore();
const { alertMessage, loading } = storeToRefs(authStore);

watch(
  () => route.params.token,
  (newToken) => {
    if (typeof newToken === 'string') {
      authStore.verifyAccount(newToken);
    }
  },
  { immediate: true }
);

</script>
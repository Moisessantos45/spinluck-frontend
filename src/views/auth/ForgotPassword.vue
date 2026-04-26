<template>
    <div class="min-h-screen flex flex-col bg-slate-50">
        <Header />

        <main class="grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                <div class="px-6 pt-10 pb-8 text-center sm:px-10 shrink-0">
                    <div
                        class="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/10">
                        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 class="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
                        Recuperar Contraseña
                    </h1>
                    <p class="text-sm text-slate-500">
                        Ingresa tu correo institucional y te enviaremos instrucciones para recuperar tu cuenta.
                    </p>
                </div>

                <div class="px-6 pb-10 sm:px-10 shrink-0">
                    <form class="space-y-6" @submit.prevent="handleSubmit">

                        <div class="space-y-1.5 focus-within:text-primary transition-colors">
                            <label for="email" class="block text-sm font-medium text-slate-700">
                                Correo de Recuperación
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input id="email" type="email" autocomplete="email" placeholder="usuario@ejemplo.com"
                                    v-model="email"
                                    class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all shadow-sm"
                                    required />
                            </div>
                        </div>

                        <div class="pt-2">
                            <button type="submit"
                                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]">
                                Verificar Correo
                            </button>
                        </div>
                    </form>

                    <div class="mt-8 pt-6 border-t border-slate-200">
                        <p class="text-center text-sm text-slate-600">
                            <RouterLink :to="{ name: 'login' }"
                                class="font-medium text-primary hover:text-primary/80 focus:outline-none focus:underline transition-colors inline-flex items-center gap-1.5">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al inicio de sesión
                            </RouterLink>
                        </p>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from "vue-toastification";
import Header from '@/components/Header.vue';
import useAuthStore from '@/store/auth';

const toast = useToast();
const authStore = useAuthStore();
const email = ref('');

const { alertMessage } = storeToRefs(authStore);

const handleSubmit = async () => {
    const result = await authStore.forgotPassword(email.value);
    if (result.isSuccess) {
        toast.success(alertMessage.value?.msg || "Correo de recuperación enviado exitosamente.");
    } else {
        toast.error(alertMessage.value?.msg || "Error al enviar el correo de recuperación.");
    }
};
</script>
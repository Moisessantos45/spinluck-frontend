<template>
    <div class="min-h-screen flex flex-col bg-background font-['Outfit'] relative overflow-x-hidden">
        <Header />

        <main class="grow flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
            <div class="absolute inset-0 bg-surface-variant/20 -z-10"></div>
            <div
                class="absolute top-0 right-0 w-full lg:w-2/5 h-full bg-linear-to-bl from-outline-variant/25 to-transparent -z-10 rounded-bl-[8rem]">
            </div>

            <div
                class="w-full max-w-lg bg-surface/95 backdrop-blur-sm rounded-2xl shadow-md border border-outline-variant/25 overflow-hidden relative">

                <div class="px-6 pt-8 pb-5 text-center sm:px-8 border-b border-outline-variant/15">
                    <div
                        class="w-14 h-14 bg-surface-variant rounded-xl flex items-center justify-center mx-auto mb-5 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-black text-primary tracking-tighter mb-2">Iniciar Sesión</h1>
                    <p class="text-sm text-secondary max-w-sm mx-auto">Ingresa tus credenciales para acceder a tu cuenta
                        de SpinLuck.</p>
                </div>

                <div class="px-6 py-7 sm:px-8">
                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <InputField label="Correo electrónico" id="email" required type="email" inputmode="email"
                            v-model="email" placeholder="admin@spinluck.com" />

                        <InputField label="Contraseña" id="password" required type="password" inputmode="text"
                            v-model="password" placeholder="••••••••" />

                        <div class="flex items-center justify-end pt-1">
                            <RouterLink to="/forgot-password"
                                class="text-sm font-bold text-secondary hover:text-primary hover:underline transition-colors">
                                ¿Olvidaste tu contraseña?</RouterLink>
                        </div>

                        <div class="pt-4 border-t border-outline-variant/15 flex flex-col gap-5">
                            <div v-if="accountNotVerified"
                                class="bg-background rounded-lg border border-outline-variant/20 p-4 space-y-3">
                                <p class="text-sm font-bold text-secondary">Tu cuenta aún no ha sido verificada.</p>
                                <button type="button" @click="resendVerification"
                                    class="px-4 py-2.5 bg-surface border border-outline-variant/30 text-primary font-bold text-sm rounded-lg hover:bg-surface-variant transition-colors">
                                    Reenviar correo de verificación
                                </button>
                            </div>

                            <button type="submit" :disabled="loading" :class="[
                                'w-full py-3.5 px-8 border border-transparent rounded-lg text-base font-bold text-on-primary transition-all active:scale-[0.99] flex justify-center items-center gap-2',
                                !loading ? 'bg-primary hover:bg-primary/90 shadow-sm' : 'bg-primary/50 cursor-not-allowed'
                            ]">
                                Autorizar Acceso
                            </button>
                        </div>
                    </form>
                </div>

                <div class="px-6 py-5 border-t border-outline-variant/15 bg-surface-variant/25 text-center sm:px-8">
                    <p class="text-sm font-medium text-secondary">
                        ¿Aún no tienes una cuenta?
                        <RouterLink to="/register"
                            class="text-primary font-bold hover:underline transition-colors ml-1">Regístrate aquí
                        </RouterLink>
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import Header from "@/components/Header.vue";
import InputField from "@/components/molecules/InputField.vue";
import useAuthStore from "@/store/auth";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const { alertMessage, accountNotVerified, requiresTwoFactor, loading } = storeToRefs(authStore);

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
    const result = await authStore.login(email.value, password.value);
    if (!result.isSuccess) {
        toast.error(alertMessage.value?.msg || "Error al iniciar sesión. Por favor, intenta nuevamente.");
        return;
    }

    if (requiresTwoFactor.value) {
        toast.info("Ingresa tu código 2FA para completar el inicio de sesión.");
        router.push({ name: "auth-two-factor-login" });
        return;
    }

    await authStore.getSession();
    toast.success("¡Inicio de sesión exitoso! Redirigiendo...");

    if (authStore.authData.firstSession && !authStore.authData.twoFactorEnabled) {
        router.push({ name: "generate-two-factor" });
        return;
    }

    router.push({
        name: authStore.authData.fullProfile ? "dashboard-home" : "dashboard-profile",
    });
};

const resendVerification = () => {
    authStore.forwardEmailVerification(email.value);
};
</script>

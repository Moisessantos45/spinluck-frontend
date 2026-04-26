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
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-black text-primary tracking-tighter mb-2">
                        Crear Cuenta
                    </h1>
                    <p class="text-sm text-secondary max-w-sm mx-auto">
                        Crea tu cuenta en SpinLuck completando el formulario y prepárate para ganar en grande.
                    </p>
                </div>

                <div class="px-6 py-7 sm:px-8">
                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <InputField label="Ingresa tu correo electrónico" id="email" required type="email"
                            inputmode="email" v-model="email" placeholder="admin@spinluck.com" />

                        <InputField label="Ingresa tu contraseña" id="password" required type="password"
                            inputmode="text" v-model="password" placeholder="••••••••" />

                        <InputField label="Confirmar Contraseña" id="confirmPassword" required type="password"
                            inputmode="text" v-model="confirmPassword" placeholder="••••••••" />

                        <div class="pt-4 border-t border-outline-variant/15 flex flex-col gap-5">
                            <Alert v-if="alertMessage.msg" :msg="alertMessage.msg" :error="alertMessage.error" />

                            <div class="bg-background rounded-lg border border-outline-variant/20 p-4 space-y-2.5">
                                <p class="text-[10px] font-bold text-secondary uppercase tracking-widest">Requisitos de
                                    seguridad</p>
                                <ul class="space-y-2">
                                    <li v-for="req in requirements" :key="req.label"
                                        class="flex items-center gap-2 text-sm text-secondary font-medium">
                                        <svg v-if="req.met" class="h-4 w-4 text-primary shrink-0" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                        <svg v-else class="h-4 w-4 text-outline shrink-0" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" />
                                        </svg>
                                        {{ req.label }}
                                    </li>
                                </ul>
                            </div>

                            <div class="flex flex-col sm:flex-row justify-end gap-3 mt-1">
                                <RouterLink to="/"
                                    class="flex justify-center items-center py-3 px-6 border border-outline-variant/30 rounded-lg text-sm font-bold text-primary bg-surface hover:bg-surface-variant transition-colors active:scale-[0.99]">
                                    Cancelar
                                </RouterLink>
                                <button type="submit" :disabled="loading" :class="[
                                    'flex justify-center items-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-sm font-bold text-on-primary transition-all active:scale-[0.99]',
                                    !loading ? 'bg-primary hover:bg-primary/90' : 'bg-primary/50 cursor-not-allowed'
                                ]">
                                    Registrarse
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

                <div class="px-6 py-5 border-t border-outline-variant/15 bg-surface-variant/25 text-center sm:px-8">
                    <p class="text-sm font-medium text-secondary">
                        ¿Ya estás registrado en la plataforma?
                        <RouterLink to="/login" class="text-primary font-bold hover:underline transition-colors ml-1">
                            Inicia sesión aquí
                        </RouterLink>
                    </p>
                </div>

            </div>
        </main>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';
import InputField from '@/components/molecules/InputField.vue';
import useAuthStore from '@/store/auth';

const useAuth = useAuthStore();
const { alertMessage, loading } = storeToRefs(useAuth);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const requirements = computed(() => [
    { label: 'Mínimo 8 caracteres', met: password.value.length >= 8 },
    { label: 'Al menos un número', met: /\d/.test(password.value) },
    { label: 'Una letra mayúscula', met: /[A-Z]/.test(password.value) },
    { label: 'Un carácter especial (@, #, $)', met: /[@#$%^&*!]/.test(password.value) },
]);


const handleSubmit = async () => {

    if (password.value !== confirmPassword.value) {
        useAuth.setAlertMessage({ error: true, msg: "Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente." });
        return;
    }

    await useAuth.register(email.value, password.value);
};


</script>

<template>
    <div class="min-h-screen flex flex-col bg-background font-['Outfit'] relative overflow-x-hidden">
        <main class="grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">

            <div class="absolute inset-0 bg-surface-variant/30 -z-10"></div>
            <div
                class="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-linear-to-bl from-outline-variant/20 to-transparent -z-10 rounded-bl-full">
            </div>

            <div
                class="w-full max-w-xl bg-surface/90 backdrop-blur-md rounded-3xl shadow-xl border border-outline-variant/20 overflow-hidden relative my-8">

                <div class="px-5 pt-6 pb-4 sm:pt-10 sm:pb-6 text-center sm:px-10 border-b border-outline-variant/10">
                    <div
                        class="w-12 h-12 sm:w-16 sm:h-16 bg-surface-variant rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                    </div>
                    <h1 class="text-3xl font-black text-primary tracking-tighter mb-2">
                        {{ isTwoFactorEnabled ? 'Verificar 2FA' : 'Proteger Cuenta' }}
                    </h1>
                    <p class="text-sm text-secondary mt-2 leading-relaxed max-w-sm mx-auto">
                        {{ isTwoFactorEnabled
                            ? 'Ingresa el código temporal de tu aplicación de autenticación para entrar al sistema.'
                            :
                            'Añade una capa extra de seguridad usando una app como Google Authenticator o Authy en tu celular.'
                        }}
                    </p>
                </div>

                <div class="px-5 py-6 sm:px-10 sm:py-8 space-y-4 sm:space-y-8">
                    <div v-if="!isTwoFactorEnabled"
                        class="relative border border-outline-variant/20 rounded-2xl p-4 sm:p-6 bg-background shadow-sm">
                        <span
                            class="absolute -top-3 -left-3 size-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md">1</span>

                        <div v-if="totpData.uri && totpData.uri.trim()"
                            class="flex flex-col items-center justify-center">
                            <h3 class="text-sm font-bold text-primary uppercase tracking-widest mb-2 text-center">Paso
                                1: Escanea este código</h3>
                            <p class="text-xs text-secondary mb-4 text-center max-w-xs">Abre tu app (ej. Google
                                Authenticator) y selecciona "Escanear código QR".</p>
                            <div
                                class="bg-white p-3 sm:p-4 rounded-xl border border-outline-variant/20 shadow-sm inline-block">
                                <QrcodeVue :value="totpData.uri" :size="130" level="M" />
                            </div>
                        </div>

                        <div v-else class="flex flex-col items-center text-center py-4">
                            <div class="w-16 h-16 text-outline-variant mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                </svg>
                            </div>
                            <h3 class="text-base font-bold text-primary mb-2">Paso 1: Generar código QR</h3>
                            <p class="text-sm text-secondary mb-6 max-w-xs">
                                Primero genera el código y luego escanéalo con la aplicación instalada en tu celular.
                            </p>
                            <button @click="generateQr" type="button"
                                class="px-4 sm:px-6 py-2.5 sm:py-3 bg-surface border border-outline-variant/30 text-primary font-bold text-sm rounded-xl hover:bg-surface-variant transition-all flex items-center gap-2 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Generar Código QR
                            </button>
                        </div>
                    </div>

                    <div class="relative border border-outline-variant/20 rounded-2xl p-4 sm:p-6 bg-background shadow-sm transition-opacity duration-300"
                        :class="(!isTwoFactorEnabled && (!totpData.uri || !totpData.uri.trim())) ? 'opacity-40 pointer-events-none' : ''">
                        <span
                            class="absolute -top-3 -left-3 size-8 rounded-full bg-surface-variant text-primary text-sm font-bold flex items-center justify-center border border-outline-variant/20 shadow-sm">{{
                                isTwoFactorEnabled ? '1' : '2' }}</span>

                        <div class="space-y-4 sm:space-y-6">
                            <div class="mb-2">
                                <h3 class="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                                    {{ isTwoFactorEnabled ? 'Verifica tu identidad' : 'Paso 2: Confirma el enlace' }}
                                </h3>
                                <p class="text-sm text-secondary">
                                    {{ isTwoFactorEnabled
                                        ? 'Abre tu aplicación e ingresa el código de 6 dígitos.'
                                        : 
                                        'Asegúrate de haber escaneado el QR. Ingresa el código numérico que aparece en la app.'
                                    }}
                                </p>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                                <InputField label="Código de 6 dígitos" id="code" required type="number"
                                    inputmode="numeric" v-model="code" placeholder="Ej: 123456" />
                            </div>

                            <button @click="verifyTotp" type="button"
                                class="w-full mt-2 sm:mt-4 px-4 sm:px-6 py-3 sm:py-4 bg-primary text-on-primary font-bold text-sm sm:text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex justify-center items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                </svg>
                                {{ isTwoFactorEnabled ? 'Ingresar al sistema' : 'Confirmar y Activar Seguridad' }}
                            </button>
                        </div>
                    </div>

                    <div v-if="!isTwoFactorEnabled" class="text-center mt-2">
                        <button @click="handleNext" type="button"
                            class="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-outline-variant/30 text-primary font-bold text-sm rounded-xl hover:bg-surface-variant transition-all">
                            Configurar más tarde (Omitir por ahora)
                        </button>
                        <p class="text-xs text-secondary mt-3">
                            Si no sabes cómo hacer esto, selecciona <strong>Omitir por ahora</strong>. Podrás
                            configurarlo después desde tu perfil.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue"
import { storeToRefs } from 'pinia';
import QrcodeVue from 'qrcode.vue'
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import InputField from '@/components/molecules/InputField.vue';
import useAuthStore from '@/store/auth';

const toast = useToast()
const router = useRouter()
const useAuth = useAuthStore()
const { totpData, authData, alertMessage } = storeToRefs(useAuth)

const attempts = ref(0)
const code = ref("")
const isTwoFactorEnabled = computed(() => authData.value.twoFactorEnabled)

const handleNext = () => {
    router.push({
        name: authData.value.fullProfile ? "dashboard-home" : "dashboard-profile",
    });
}

const generateQr = async () => {
    const result = await useAuth.generateTwoFactor()
    if (result.isSuccess) {
        toast.success("¡Código QR generado! Escanéalo con tu aplicación de autenticación.")
    } else {
        toast.error("Error al generar el código QR. Por favor, intenta de nuevo.")
    }
}

const verifyTotp = async () => {
    if (attempts.value >= 3) {
        await useAuth.logout();
        toast.error("Has excedido el número máximo de intentos. Por favor, inicia sesión nuevamente.");
        router.push({ name: "login" });

        return;
    }

    const result = await useAuth.verifyTwoFactor(code.value)
    if (!result.isSuccess) {
        toast.error(alertMessage.value?.msg || "Error al verificar el código. Por favor, intenta nuevamente.");
        attempts.value++;
    } else {
        toast.success(isTwoFactorEnabled.value
            ? "¡Código verificado exitosamente!"
            : "¡Autenticación 2FA activada exitosamente!");
        handleNext()
    }
}

onMounted(() => {
    useAuth.getSession()
})
</script>
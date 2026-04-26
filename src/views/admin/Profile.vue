<template>
    <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tighter leading-none mb-2 text-primary">Perfil del Organizador</h2>
        <p class="text-secondary text-sm tracking-wide uppercase font-bold">Gestiona tu identidad y seguridad de la
            cuenta</p>
    </div>

    <div class="flex flex-col gap-8">
        <div class=" space-y-8">
            <Alert v-if="alertMessage.msg" :msg="alertMessage.msg" :error="alertMessage.error" />
            <div class="bg-surface border border-outline-variant/20 rounded-2xl p-8 shadow-sm">
                <h3 class="text-lg font-black tracking-tight text-primary mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5 text-secondary">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21c-2.676 0-5.216-.584-7.499-1.882Z" />
                    </svg>
                    Información Pública
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <InputField label="Nombre del Organizador" id="name" required type="text" inputmode="text"
                            v-model="dataForm.name" placeholder="John Doe" />
                    </div>
                    <div class="space-y-2">
                        <InputField label="Teléfono" id="phone" type="text" inputmode="tel" v-model="dataForm.phone"
                            placeholder="+1 (555) 000-0000" />
                    </div>
                </div>

                <div class="mt-8 pt-6 border-t border-outline-variant/20 flex justify-end">
                    <button type="button" @click="handleClick" :disabled="organizerLoading"
                        class="px-8 py-3 bg-primary text-on-primary text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all">
                        Guardar Información
                    </button>
                </div>
            </div>
            <div class="bg-surface border border-outline-variant/20 rounded-2xl p-8 shadow-sm">
                <h3 class="text-lg font-black tracking-tight text-primary mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5 text-secondary">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Seguridad y Acceso
                </h3>

                <div class="space-y-6">
                    <div
                        class="flex items-center justify-between p-4 bg-surface-variant/30 rounded-xl border border-outline-variant/20">
                        <div>
                            <p class="text-sm font-bold text-primary">Confirmación de Correo</p>
                            <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">
                                Tu dircción de correo es solo de lectura
                            </p>
                        </div>
                        <span
                            class="px-3 py-1 bg-surface border border-outline-variant/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.909A2.25 2.25 0 0 1 2.25 8.993V6.75m19.5 0V8.99" />
                            </svg>

                            {{ authData.email }}
                        </span>
                    </div>

                    <div
                        class="flex items-center justify-between p-4 bg-surface-variant/30 rounded-xl border border-outline-variant/20">
                        <div>
                            <p class="text-sm font-bold text-primary">Confirmación de Correo</p>
                            <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">Tu dirección
                                ha sido verificada</p>
                        </div>
                        <span
                            class="px-3 py-1 bg-surface border border-outline-variant/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {{ authData.emailConfirmed ? "Verificado" : "No Verificado" }}
                        </span>
                    </div>

                    <div
                        class="flex items-center justify-between p-4 bg-surface-variant/30 rounded-xl border border-outline-variant/20">
                        <div>
                            <p class="text-sm font-bold text-primary">
                                Autenticación de Dos Factores (2FA)
                            </p>
                            <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">
                                Protección extra para tu cuenta
                            </p>
                        </div>
                        <button type="button"
                            @click="authData.twoFactorEnabled ? handleDisableTwoFactor() : $router.push({ name: 'generate-two-factor' })"
                            class="px-4 py-2 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                            Configurar 2FA
                        </button>
                    </div>

                    <div class="p-4 bg-surface-variant/30 rounded-xl border border-outline-variant/20 space-y-4">
                        <div>
                            <p class="text-sm font-bold text-primary">Actualizar Contraseña</p>
                            <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">
                                Ingresa tu contraseña actual y la nueva contraseña
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Contraseña actual" id="current-password" required type="password"
                                inputmode="text" autocomplete="current-password" v-model="currentPassword"
                                placeholder="••••••••" />
                            <InputField label="Nueva contraseña" id="new-password" required type="password"
                                inputmode="text" autocomplete="new-password" v-model="newPassword"
                                placeholder="••••••••" />
                        </div>

                        <div class="flex justify-end">
                            <button type="button" @click="handleUpdatePassword" :disabled="passwordLoading"
                                class="px-6 py-2 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
                                Actualizar contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from "vue-toastification";
import Alert from '@/components/molecules/Alert.vue';
import InputField from '@/components/molecules/InputField.vue';
import { useApiResult } from '@/composables/useApiResult';
import useOrganizerStore from '@/store/organizer';
import useAuthStore from '@/store/auth';

const toast = useToast();
const { loading: organizerLoading, alertMessage } = useApiResult();
const authStore = useAuthStore();
const organizerStore = useOrganizerStore();
const { authData } = storeToRefs(authStore);
const { dataForm } = storeToRefs(organizerStore);
const currentPassword = ref('');
const newPassword = ref('');
const passwordLoading = ref(false);

const handleClick = async () => {
    const result = await (dataForm.value.id != -1 ? organizerStore.updateOrganizer() : organizerStore.addOrganizer());
    if (result.isSuccess) {
        toast.success("Información del organizador actualizada correctamente.");
    } else {
        toast.error(alertMessage.value?.msg || "Error al actualizar la información del organizador.");
    }
};

const handleUpdatePassword = async () => {
    if (!currentPassword.value.trim() || !newPassword.value.trim()) {
        toast.error("Debes completar la contraseña actual y la nueva contraseña.");
        return;
    }

    passwordLoading.value = true;
    const result = await authStore.updatePassword(currentPassword.value, newPassword.value);
    passwordLoading.value = false;

    if (result.isSuccess) {
        toast.success("Contraseña actualizada correctamente.");
        currentPassword.value = '';
        newPassword.value = '';
    } else {
        toast.error(authStore.alertMessage.msg || "No se pudo actualizar la contraseña.");
    }
};

const handleDisableTwoFactor = async () => {
    const result = await authStore.disableTwoFactor();
    if (result.isSuccess) {
        toast.success(alertMessage.value?.msg || "Autenticación de dos factores deshabilitada correctamente.");
    } else {
        toast.error(authStore.alertMessage?.msg || "No se pudo deshabilitar la autenticación de dos factores.");
    }
};
</script>
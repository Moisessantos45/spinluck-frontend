<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" @click="!loading && emit('close')"></div>
        <div
            class="relative bg-surface border border-outline-variant/20 rounded-2xl p-8 max-w-md w-full shadow-lg flex flex-col items-center text-center">

            <div
                class="w-16 h-16 bg-background border border-outline-variant/20 rounded-full flex items-center justify-center mb-6 shadow-sm text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
            </div>

            <h3 class="text-2xl font-black tracking-tight text-primary mb-2">Generar Ganador</h3>

            <div v-if="loading" class="w-full flex flex-col items-center gap-4 my-6">
                <div class="relative w-14 h-14">
                    <div
                        class="absolute inset-0 rounded-full border-4 border-outline-variant/20 border-t-primary animate-spin">
                    </div>
                </div>
                <p class="text-sm font-medium text-secondary animate-pulse">Procesando sorteo...</p>
            </div>

            <template v-else>
                <div v-if="!winnerTicket">
                    <p class="text-sm font-medium text-secondary mb-8 leading-relaxed">¿Estás seguro de que deseas
                        ejecutar el sorteo criptográficamente seguro ahora? Esta acción seleccionará un ganador final
                        de entre los números vendidos.</p>
                    <div class="flex gap-4 w-full">
                        <button @click="emit('close')"
                            class="flex-1 bg-surface border border-outline-variant/20 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest text-primary hover:bg-surface-variant/50 transition-colors shadow-sm">
                            Cancelar
                        </button>
                        <button @click="handleGenerate"
                            class="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-sm">
                            Generar
                        </button>
                    </div>
                </div>

                <div v-else class="w-full">
                    <div
                        class="bg-background border border-outline-variant/20 rounded-2xl p-6 mb-6 flex flex-col items-center gap-2 shadow-sm">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-secondary">Número
                            Ganador</span>
                        <span class="text-6xl font-black tracking-tight text-primary">{{ winnerTicket.number }}</span>
                        <span class="text-sm font-semibold text-secondary">{{ winnerTicket.participantName }}</span>
                        <span class="text-xs text-secondary">{{ winnerTicket.participantPhone }}</span>
                    </div>
                    <div class="flex gap-4 w-full">
                        <button @click="handleCancel"
                            class="flex-1 bg-surface border border-outline-variant/20 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest text-primary hover:bg-surface-variant/50 transition-colors shadow-sm">
                            Cancelar
                        </button>
                        <button @click="handleConfirm"
                            class="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-sm">
                            Confirmar Ganador
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import useTicketStore from '@/store/ticket';
import type { Ticket } from '@/entities/ticket';

const emit = defineEmits<{ close: [] }>();

const route = useRoute();
const raffleId = route.params.id || 0;
const toast = useToast();

const ticketStore = useTicketStore();
const { loading, alertMessage } = storeToRefs(ticketStore);

const winnerTicket = ref<Ticket | null>(null);

const handleGenerate = async () => {
    if (typeof raffleId !== 'string' || isNaN(Number(raffleId))) return;
    try {
        await ticketStore.getRandomSoldTicket(Number(raffleId));
        if (ticketStore.ticketFormState.id && ticketStore.ticketFormState.id > 0) {
            winnerTicket.value = { ...ticketStore.ticketFormState };
        } else {
            toast.error(alertMessage.value?.msg || 'No se encontró un ticket ganador.');
        }
    } catch {
        toast.error('Error inesperado al generar el ganador.');
    }
};

const handleConfirm = async () => {

    const result = await ticketStore.updateTicketToWinner(winnerTicket.value?.id || 0, Number(raffleId));
    if (result.isSuccess) {
        toast.success('¡Ganador confirmado exitosamente!');
        emit('close');
    } else {
        toast.error(alertMessage.value?.msg || 'Error al confirmar el ganador.');
    }

};

const handleCancel = () => {
    winnerTicket.value = null;
};
</script>

<template>
    <div
        class="px-4 md:px-12 pt-6 md:pt-8 pb-4 shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
        <div>
            <p class="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Serie Limitada Vantablack #04</p>
            <h1 class="text-4xl font-black tracking-tight text-primary">Gestionar Números</h1>
        </div>
        <button @click="showWinnerModal = true"
            class="px-6 py-3 bg-primary text-on-primary font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
            </svg>
            Generar Ganador
        </button>
    </div>

    <div
        class="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden px-4 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-12 gap-6 md:gap-8 no-scrollbar">
        <div
            class="flex-1 md:overflow-y-auto bg-surface border border-outline-variant/20 rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm no-scrollbar shrink-0 md:shrink">
            <div v-if="tickets.length > 0"
                class="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8 text-[10px] font-bold tracking-widest uppercase">
                <div v-for="status in ticketStatus" :key="status.id" class="flex items-center gap-2">
                    <div :class="[
                        getStatusColor(status.id),
                        'w-3 h-3 rounded-sm border border-outline-variant/20'
                    ]"></div>

                    <span class="text-secondary">
                        {{ status.name }}
                    </span>
                </div>
            </div>

            <div v-if="tickets.length > 0"
                class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 md:gap-4">
                <button type="button" v-for="ticket in tickets" :key="ticket.id" @click="getTicket(ticket.id)"
                    :class="['aspect-square border border-outline-variant/20 hover:border-primary rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer shadow-sm', getTicketColor(ticket.ticketStatusId, ticket.winner), ticketFormState.id === ticket.id ? 'ring-2 ring-primary' : '']">
                    {{ ticket.number }}
                </button>
            </div>
        </div>

        <aside
            class="w-full md:w-80 lg:w-96 shrink-0 bg-surface border border-outline-variant/20 rounded-2xl p-6 md:p-6 lg:p-8 flex flex-col shadow-sm">
            <div class="mb-8 flex items-center justify-between">
                <h3 class="text-xl font-black tracking-tight text-primary">Registro de Participante</h3>
                <button class="text-secondary hover:text-primary transition-colors p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form class="flex-1 flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <label class="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Número Seleccionado
                    </label>
                    <div
                        class="px-4 py-3 bg-surface-variant/30 border border-outline-variant/20 rounded-xl flex items-center justify-between">
                        <span class="font-black text-xl tracking-tight text-primary">
                            {{ ticketFormState.number || '---' }}
                        </span>
                        <span
                            class="text-[10px] font-bold uppercase tracking-widest text-primary bg-background border border-outline-variant/20 px-3 py-1.5 rounded-lg shadow-sm">
                            {{ ticketFormState.ticketStatus?.name || '---' }}
                        </span>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <InputField label="Nombre Completo" id="fullName" required type="text"
                        v-model="ticketFormState.participantName" placeholder="Ingresa el nombre completo" />
                </div>

                <div class="flex flex-col gap-2">
                    <InputField label="Telefono" id="phone" required type="tel"
                        v-model="ticketFormState.participantPhone" placeholder="Ingresa el número de teléfono" />
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Estado del Número
                    </label>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="status in ticketStatus" :key="status.id" type="button"
                            @click="ticketFormState.ticketStatusId = status.id" :class="[
                                ticketFormState.ticketStatusId === status.id ? 'bg-primary text-on-primary' : 'bg-surface-variant/30 text-primary',
                                'w-full md:w-auto px-4 py-2 rounded-xl border border-outline-variant/20 text-sm font-bold hover:border-primary transition-all shadow-sm'
                            ]">
                            {{ status.name }}
                        </button>
                    </div>
                </div>

                <div class="mt-auto pt-8 border-t border-outline-variant/20 gap-2 flex flex-col">
                    <button @click.prevent="handleClickVoucher()" :disabled="loading"
                        class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-sm hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button">
                        {{ loading ? 'Cargando...' : 'Generar Voucher' }}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                    <button @click.prevent="handleClickSave()" :disabled="loading"
                        class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-sm hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button">
                        {{ loading ? 'Cargando...' : 'Confirmar Reserva' }}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                    <p class="text-[10px] font-bold tracking-widest uppercase text-center text-secondary mt-4">La
                        reserva retiene el número por 15 minutos.</p>
                </div>
            </form>
        </aside>
    </div>

    <WinnerModal v-if="showWinnerModal" @close="showWinnerModal = false" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useToast } from "vue-toastification";
import useTicketStore from '@/store/ticket';
import InputField from '@/components/molecules/InputField.vue';
import WinnerModal from '@/features/WinnerModal.vue';

const route = useRoute();
const raffleId = route.params.id || 0
const toast = useToast();

const showWinnerModal = ref(false);
const ticketStore = useTicketStore();
const { loading, tickets, ticketStatus, ticketFormState, alertMessage } = storeToRefs(ticketStore);

const getStatusColor = (id: number) => {
    const colors: { [key: number]: string } = {
        1: 'bg-primary text-on-primary',
        2: 'bg-green-500 text-white',
        3: 'bg-yellow-500 text-white',
        4: 'bg-red-500 text-white',
    }

    return colors[id] || 'bg-surface-variant/30 text-primary'
}

const getTicketColor = (statusId: number, winner: boolean) => {
    if (winner) return 'bg-accent text-on-accent border-accent/60 hover:border-accent';
    return getStatusColor(statusId);
}

const getTickets = async () => {
    if (typeof raffleId === 'string' && !isNaN(Number(raffleId))) {
        await ticketStore.getTickets(Number(raffleId));
    }
};

const getTicket = async (id: number) => {
    await ticketStore.getTicket(id);
};

const handleClickSave = async () => {
    if (!ticketFormState.value.id || ticketFormState.value.id <= 0) return;
    try {
        const result = await ticketStore.updateTicket();
        if (result.isSuccess) {
            toast.success("¡Número actualizado exitosamente!");
            getTickets();
        } else {
            toast.error(alertMessage.value?.msg || "Error al actualizar el número. Por favor, intenta nuevamente.");
        }
    } catch {
        toast.error("Error inesperado. Por favor, intenta nuevamente.");
    }
};

const handleClickVoucher = async () => {
    if (!ticketFormState.value.id || ticketFormState.value.id <= 0) return;
    try {
        const result = await ticketStore.getGeneratedVoucher(ticketFormState.value.id);
        if (result.isSuccess) {
            toast.success("¡Voucher generado exitosamente!");
        } else {
            toast.error(alertMessage.value?.msg || "Error al generar el voucher. Por favor, intenta nuevamente.");
        }
    } catch {
        toast.error("Error inesperado. Por favor, intenta nuevamente.");
    }
};

onMounted(() => {
    ticketStore.getStateTickets();
    getTickets();
});

</script>

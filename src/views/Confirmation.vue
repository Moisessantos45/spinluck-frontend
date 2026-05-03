<template>
    <main
        class="min-h-screen bg-background font-['Outfit'] flex flex-col overflow-x-hidden p-8 justify-center items-center">
        <h1 class="text-3xl md:text-4xl font-black tracking-tight text-primary mb-12">Sorteo SpinLuck</h1>

        <div v-if="phase === 'form'" class="w-full max-w-md">
            <div class="bg-surface border border-outline-variant/20 rounded-2xl p-8 shadow-sm">
                <span class="text-[11px] font-bold tracking-widest text-secondary uppercase mb-6 block">Datos del
                    Participante</span>
                <div class="flex flex-col gap-5">
                    <div class="flex gap-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" value="random" v-model="selectionMode"
                                class="w-4 h-4 text-primary focus:ring-primary border-outline-variant/30" />
                            <span class="text-sm font-bold text-primary">Número aleatorio</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" value="specific" v-model="selectionMode"
                                class="w-4 h-4 text-primary focus:ring-primary border-outline-variant/30" />
                            <span class="text-sm font-bold text-primary">Buscar número</span>
                        </label>
                    </div>

                    <div v-if="selectionMode === 'specific'" class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">Número
                            deseado</label>
                        <input v-model="specificTicketNumber" type="text" placeholder="Ej. 123"
                            class="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-primary font-medium placeholder:text-secondary/50 focus:outline-none focus:border-primary/60 transition-colors" />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">Nombre
                            completo</label>
                        <input v-model="participantName" type="text" placeholder="Ej. Juan Pérez"
                            class="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-primary font-medium placeholder:text-secondary/50 focus:outline-none focus:border-primary/60 transition-colors" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-bold tracking-widest text-secondary uppercase">Teléfono</label>
                        <div
                            class="flex items-center bg-background border border-outline-variant/30 rounded-xl overflow-hidden focus-within:border-primary/60 transition-colors">
                            <span
                                class="px-3 py-3 text-sm font-bold text-secondary border-r border-outline-variant/20">+52</span>
                            <input v-model="participantPhone" type="tel" placeholder="4811234567"
                                class="flex-1 bg-transparent px-4 py-3 text-sm text-primary font-medium placeholder:text-secondary/50 focus:outline-none" />
                        </div>
                    </div>

                    <button @click="submitForm"
                        class="w-full py-4 bg-primary text-on-primary rounded-xl font-bold tracking-[0.05em] text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-md mt-2">
                        Obtener mi boleto
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="phase === 'loading'" class="flex flex-col items-center gap-8">
            <div class="relative w-28 h-28">
                <div class="absolute inset-0 rounded-full border-4 border-primary/10"></div>
                <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin">
                </div>
                <div class="absolute inset-3 rounded-full border-4 border-transparent border-t-primary/40 animate-spin"
                    style="animation-duration:1.5s;animation-direction:reverse"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-8 h-8 text-primary animate-pulse">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a3 3 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                </div>
            </div>
            <div class="text-center">
                <p class="text-primary font-black text-lg tracking-tight">Asignando tu boleto</p>
                <p class="text-secondary text-sm font-medium mt-1">Verificando disponibilidad de manera segura...</p>
            </div>
            <div class="flex gap-1.5">
                <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay:300ms"></span>
            </div>
        </div>



        <div v-if="phase === 'success'" class="w-full max-w-2xl flex flex-col items-center gap-8">
            <div
                class="w-full bg-surface border border-outline-variant/20 rounded-2xl p-12 md:p-16 relative overflow-hidden flex flex-col items-center justify-center shadow-sm text-center">
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl">
                    </div>
                </div>
                <div class="relative z-10 flex flex-col items-center gap-6">
                    <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-8 h-8 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                    </div>
                    <span class="text-[11px] font-bold tracking-widest text-secondary uppercase">Tu Número de
                        Boleto</span>
                    <div class="text-7xl md:text-[8rem] font-black tracking-tighter leading-none text-primary">
                        {{ ticketWithOrganizerNumber.formattedNumber }}
                    </div>
                    <div class="grid grid-cols-2 gap-3 w-full max-w-xs text-left">
                        <div class="p-3 bg-background rounded-xl border border-outline-variant/20">
                            <span
                                class="block text-[9px] font-bold tracking-widest text-secondary uppercase mb-1">Nombre</span>
                            <span class="text-sm font-bold text-primary truncate block">
                                {{ participantName }}
                            </span>
                        </div>
                        <div class="p-3 bg-background rounded-xl border border-outline-variant/20">
                            <span
                                class="block text-[9px] font-bold tracking-widest text-secondary uppercase mb-1">Teléfono</span>
                            <span class="text-sm font-bold text-primary">+52{{ participantPhone }}</span>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center gap-2 text-secondary text-[11px] font-bold uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        Verificado Criptográficamente
                    </div>
                </div>
            </div>

            <div class="w-full max-w-md flex flex-col gap-4">
                <button id="alertButton" @click="sendWhatsApp"
                    class="w-full bg-[#25D366] text-white py-4 px-8 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-sm hover:opacity-90 transition-all active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Confirmar por WhatsApp
                </button>

                <RouterLink
                    class="text-[11px] font-bold text-secondary uppercase tracking-widest hover:text-primary transition-colors inline-flex items-center gap-2 justify-center mt-4"
                    :to="{ name: 'raffle-public', params: { slug: ticketWithOrganizerNumber.slug } }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Volver al Panel
                </RouterLink>
            </div>
        </div>

        <footer
            class="fixed bottom-12 left-1/2 -translate-x-1/2 w-full px-8 flex justify-between items-end opacity-20 pointer-events-none">
            <div class="text-[10px] font-bold tracking-widest uppercase text-primary">SpinLuck OS v1.0.0</div>
            <div class="w-32 h-px bg-primary"></div>
            <div class="text-[10px] font-bold tracking-widest uppercase text-primary">ID: SL-442-LA</div>
        </footer>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import useTicketStore from '@/store/ticket';

const route = useRoute();
const toast = useToast();
const ticketStore = useTicketStore();
const { ticketWithOrganizerNumber } = storeToRefs(ticketStore);

type Phase = 'form' | 'loading' | 'success';
const phase = ref<Phase>('form');
const participantName = ref('');
const participantPhone = ref('');
const selectionMode = ref<'random' | 'specific'>('random');
const specificTicketNumber = ref('');

const raffleId = Number(route.query.raffleId);

const submitForm = async () => {
    if (!participantName.value.trim()) {
        toast.warning('Por favor ingresa tu nombre.');
        return;
    }
    if (!participantPhone.value.trim() || participantPhone.value.replace(/\D/g, '').length < 10) {
        toast.warning('Por favor ingresa un teléfono válido de 10 dígitos.');
        return;
    }
    if (selectionMode.value === 'specific' && !specificTicketNumber.value.trim()) {
        toast.warning('Por favor ingresa el número que deseas buscar.');
        return;
    }

    phase.value = 'loading';
    let result;

    if (selectionMode.value === 'random') {
        result = await ticketStore.getRandomAvailableTicket(raffleId);
    } else {
        ticketStore.clearDataForm();
        result = await ticketStore.searchTicketByNumber(raffleId, specificTicketNumber.value);
    }

    if (!result.isSuccess) {
        toast.error('Ocurrió un error al obtener tu boleto. Por favor intenta de nuevo.');
        phase.value = 'form';
        return;
    }

    phase.value = 'success';
};

const sendWhatsApp = () => {
    let organizer = String(ticketWithOrganizerNumber.value.organizerNumber || '')
        .replace(/\D/g, '');

    if (organizer.startsWith('521')) {
        organizer = organizer.slice(3);
    } else if (organizer.startsWith('52')) {
        organizer = organizer.slice(2);
    }

    if (organizer.length !== 10) {
        toast.error('El número del organizador no es válido.');
        return;
    }

    const numero = `521${organizer}`;
    const participant = String(participantPhone.value || '').replace(/\D/g, '');

    const mensaje = `¡Hola! Me gustaría participar en el sorteo SpinLuck.

    Número de boleto: ${ticketWithOrganizerNumber.value.formattedNumber}
    Nombre: ${participantName.value}
    Teléfono: ${participant}

    Por favor confirmen mi participación. ¡Gracias!`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
};

onMounted(() => {
    if (!raffleId || isNaN(raffleId)) {
        toast.error('No se encontró el ID de la rifa. Regresa e intenta de nuevo.');
    }
});
</script>
<template>
    <div class="min-h-screen bg-background font-['Outfit'] text-on-background flex flex-col overflow-x-hidden p-8">

        <div v-if="loading" class="flex items-center justify-center h-64">
            <svg class="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>

        <section v-else-if="!raffleExists" class="flex items-center justify-center w-full py-20">
            <div class="w-full max-w-2xl bg-surface border border-outline-variant/20 rounded-xl p-8 text-center">
                <span class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase block mb-2">
                    Estado de la rifa
                </span>
                <h1 class="text-2xl font-black tracking-tight text-primary mb-3">
                    Esta rifa no existe
                </h1>
                <p class="text-secondary text-sm leading-relaxed">
                    El enlace que abriste no corresponde a una rifa válida. Verifica la URL o vuelve más tarde.
                </p>
            </div>
        </section>

        <section v-else class="flex flex-col lg:flex-row justify-center gap-12 mb-24 w-full">
            <div class="w-full lg:w-2/5 group">
                <div
                    class="relative aspect-4/5 lg:aspect-square overflow-hidden rounded-2xl bg-surface border border-outline-variant/20 shadow-sm">
                    <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        data-alt="Minimalist luxury white wristwatch on a sleek stone surface with sharp dramatic shadows"
                        :src="dataForm.imageUrl" />
                    <div class="absolute top-6 left-6">
                        <span
                            class="px-3 py-1 bg-primary text-on-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-lg shadow-sm">
                            Sorteo Exclusivo
                        </span>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-2/5 flex flex-col justify-center">
                <div class="space-y-2 mb-8">
                    <span class="text-xs font-bold tracking-widest text-secondary uppercase">
                        Rifa #{{ dataForm.slug ?? "..." }}
                    </span>
                    <h1 class="text-5xl font-black tracking-tight text-primary leading-[1.1]">
                        {{ dataForm.title ?? "Cargando..." }}
                    </h1>
                </div>
                <div class="space-y-6 mb-12">
                    <p class="text-secondary text-lg leading-relaxed font-medium">
                        {{ dataForm.description ?? "Cargando descripción..." }}
                    </p>
                    <div class="space-y-3">
                        <div class="flex justify-between items-end">
                            <span
                                class="text-[10px] font-bold tracking-widest text-secondary uppercase">Disponibilidad</span>
                            <span class="text-sm font-black text-primary">
                                {{ dataForm.ticketsAvailable }} / {{ dataForm.quantityTickets }} Boletos · {{
                                soldPercentage }}% vendido
                            </span>
                        </div>
                        <div class="h-1.5 w-full bg-surface-variant relative rounded-full overflow-hidden">
                            <div class="absolute top-0 left-0 h-full bg-primary"
                                :style="{ width: `${soldPercentage}%` }"></div>
                            <div class="absolute inset-0 flex justify-between pointer-events-none">
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                                <div class="w-px h-full bg-white/20"></div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-surface rounded-xl border border-outline-variant/20 shadow-sm">
                            <span class="block text-[9px] font-bold tracking-[0.15em] text-secondary uppercase mb-1">
                                Costo de Boleto
                            </span>
                            <span class="text-xl font-black tracking-tight text-primary">
                                ${{ dataForm.price ?? "00.00" }}
                            </span>
                        </div>
                        <div class="p-4 bg-surface rounded-xl border border-outline-variant/20 shadow-sm">
                            <span class="block text-[9px] font-bold tracking-[0.15em] text-secondary uppercase mb-1">
                                Fecha del Sorteo
                            </span>
                            <span class="text-xl font-black tracking-tight text-primary">
                                {{ dataForm.date ?? "..." }}
                            </span>
                        </div>
                    </div>
                </div>
                <button @click="goToConfirmation"
                    class="w-full py-5 bg-primary text-on-primary rounded-xl font-bold tracking-[0.05em] text-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-md">
                    Participar Ahora
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
                <p class="text-center mt-4 text-[10px] text-secondary font-bold tracking-widest uppercase">
                    Verificado por el Protocolo Criptográfico de SpinLuck
                </p>
            </div>
        </section>

        <section v-if="raffleExists"
            class="border-t border-outline-variant/20 flex flex-col mx-auto w-full max-w-6xl pt-10">
            <div class="flex justify-between items-end mb-8">
                <div>
                    <h1 class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase mb-2 block">
                        Premios Disponibles
                    </h1>
                </div>
            </div>

            <div v-if="prizes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-4">
                <div v-for="prize in prizes" :key="prize.id" class="group">
                    <div
                        class="relative aspect-4/3 overflow-hidden rounded-xl bg-surface border border-outline-variant/20 mb-3">
                        <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            data-alt="Professional studio photo of high-end black over-ear headphones on a monochromatic grey background"
                            :src="prize.imageUrl" />

                    </div>
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-base tracking-tight mb-1 text-primary">
                            {{ prize.title }}</h3>
                    </div>
                </div>

            </div>
            <div v-else class="bg-surface border border-outline-variant/20 rounded-xl p-6 text-center">
                <p class="text-secondary text-sm">No hay premios cargados para esta rifa todavía.</p>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useRaffleStore from '@/store/raffle';
import usePrizeStore from '@/store/prize';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug || ""

const raffleStore = useRaffleStore();
const prizeStore = usePrizeStore();
const { dataForm, loading } = storeToRefs(raffleStore);
const { prizes } = storeToRefs(prizeStore);

const raffleExists = computed(() => dataForm.value.id !== -1);
const ticketsTotal = computed(() => Math.max(0, dataForm.value.quantityTickets || 0));
const ticketsAvailable = computed(() => Math.min(Math.max(0, dataForm.value.ticketsAvailable || 0), ticketsTotal.value));
const soldPercentage = computed(() => {
    if (ticketsTotal.value === 0) return 0;
    const soldTickets = ticketsTotal.value - ticketsAvailable.value;
    return Math.round((soldTickets / ticketsTotal.value) * 100);
});

const getData = async () => {
    if (typeof slug === 'string' && slug.trim() !== "") {
        prizes.value.splice(0, prizes.value.length);
        await raffleStore.getRaffleBySlug(slug);
        if (dataForm.value.id !== -1) {
            await prizeStore.getPrizesBySlug(slug);
        }
    }
};

const goToConfirmation = () => {
    router.push({ name: 'confirmation', query: { raffleId: dataForm.value.id } });
};

onMounted(() => {
    getData();
});
</script>
<template>
    <div class="flex flex-col gap-6 md:gap-8">
        <section class="rounded-3xl border border-outline-variant/20 bg-surface p-6 md:p-8">
            <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                <div>
                    <h2 class="text-3xl md:text-4xl font-black tracking-tighter text-primary">Gestión de sorteos</h2>
                    <p class="mt-2 text-sm md:text-base text-secondary font-medium">
                        Supervisa ciclos activos, avances de venta y distribución de bolsa en un solo panel.
                    </p>
                </div>
                <!-- <div class="grid grid-cols-3 gap-2.5 w-full lg:w-auto lg:min-w-90">
                    <div class="rounded-xl border border-outline-variant/20 bg-background px-3 py-2.5 text-center">
                        <p class="text-lg md:text-xl font-black text-primary">12</p>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Activos</p>
                    </div>
                    <div class="rounded-xl border border-outline-variant/20 bg-background px-3 py-2.5 text-center">
                        <p class="text-lg md:text-xl font-black text-primary">$1.2M</p>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Volumen</p>
                    </div>
                    <div class="rounded-xl border border-outline-variant/20 bg-background px-3 py-2.5 text-center">
                        <p class="text-lg md:text-xl font-black text-primary">99.9%</p>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Precisión</p>
                    </div>
                </div> -->
            </div>
        </section>


        <div class="grid grid-cols-1 gap-6">
            <section class="rounded-3xl border border-outline-variant/20 bg-surface overflow-hidden">
                <div class="px-5 md:px-7 py-5 border-b border-outline-variant/10 flex items-center justify-between">
                    <h3 class="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-primary">Sorteos activos
                    </h3>
                    <button
                        class="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                        Ver historial
                    </button>
                </div>

                <div v-if="!loading && rafflesGenerics.length > 0" class="divide-y divide-outline-variant/10">
                    <article v-for="raffle in rafflesGenerics" :key="raffle.id"
                        class="p-5 md:p-6 hover:bg-surface-variant/20 transition-colors">
                        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div
                                    class="h-15 w-15 bg-background rounded-xl overflow-hidden border border-outline-variant/20 shrink-0">
                                    <img class="w-full h-full object-cover"
                                        data-alt="minimalist studio photography of a luxury minimalist white wristwatch on a grey stone pedestal"
                                        :src="raffle.imageUrl" />
                                </div>
                                <div>
                                    <h4 class="text-base font-bold tracking-tight text-primary">
                                        {{ raffle.title }}
                                    </h4>
                                    <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">
                                        Slug: {{ raffle.slug }}
                                    </p>
                                    <span
                                        class="mt-1 inline-flex px-2.5 py-1 rounded-md bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest">
                                        {{ raffle.status }}
                                    </span>
                                </div>
                            </div>

                            <div
                                class="flex flex-col sm:flex-row lg:flex-nowrap items-stretch sm:items-center justify-between w-full lg:w-auto gap-4 lg:gap-8 mt-4 lg:mt-0">
                                <div class="min-w-35 w-full sm:flex-1">
                                    <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                                        Progreso
                                    </p>
                                    <div class="mt-2 h-1.5 w-full rounded-full bg-surface-variant overflow-hidden">
                                        <div class="h-full bg-primary rounded-full"
                                            :style="{ width: `${getNormalizedProgress(raffle.progress)}%` }"></div>
                                    </div>
                                    <p class="mt-1 text-[10px] font-bold text-secondary">
                                        {{ getNormalizedProgress(raffle.progress) }}% vendido
                                    </p>
                                </div>
                                <div class="w-full sm:w-auto text-left sm:text-right flex flex-col items-start sm:items-end gap-2 shrink-0">
                                    <p class="text-lg font-black tracking-tight text-primary">
                                        ${{ raffle.totalAmount }}
                                    </p>
                                    <p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">
                                        Bolsa actual
                                    </p>
                                    <div class="grid grid-cols-2 sm:flex sm:flex-row gap-2 w-full">
                                        <button
                                            @click="$router.push({ name: 'dashboard-manage-numbers', params: { id: raffle.id } })"
                                            class="px-3.5 py-2 rounded-lg border border-primary bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity w-full sm:w-auto">
                                            Gestionar
                                        </button>
                                        <button
                                            @click="$router.push({ name: 'dashboard-add-raffle', query: { raffle: raffle.id } })"
                                            class="px-3.5 py-2 rounded-lg border border-outline-variant/30 bg-background text-primary text-[10px] font-bold uppercase tracking-widest hover:border-primary/40 transition-colors w-full sm:w-auto">
                                            Editar
                                        </button>
                                        <button
                                            @click="openPublicRaffle(raffle.slug)"
                                            class="px-3.5 py-2 rounded-lg border border-outline-variant/30 bg-background text-primary text-[10px] font-bold uppercase tracking-widest hover:border-primary/40 transition-colors w-full sm:w-auto">
                                            Compartir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div v-else-if="!loading" class="p-5 md:p-6 text-center">
                    <p class="text-sm md:text-base font-medium text-secondary">No hay sorteos activos en este momento.
                    </p>
                </div>
            </section>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useRaffleStore from '@/store/raffle';

const raffleStore = useRaffleStore();
const { rafflesGenerics, loading } = storeToRefs(raffleStore);
const router = useRouter();

const getNormalizedProgress = (progress: number | string | null | undefined) => {
    const numericProgress = Number(progress);

    if (Number.isNaN(numericProgress)) {
        return 0;
    }

    return Math.min(100, Math.max(0, Math.round(numericProgress)));
};

const openPublicRaffle = (slug: string) => {
    const routeData = router.resolve({
        name: 'raffle-public',
        params: { slug },
    });

    window.open(routeData.href, '_blank', 'noopener,noreferrer');
};


onMounted(() => {
    raffleStore.getRafflesGenerics();
});
</script>
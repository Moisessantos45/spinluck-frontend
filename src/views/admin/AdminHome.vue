<template>
    <div class="flex flex-col gap-6 md:gap-8">
        <section class="rounded-3xl border border-outline-variant/20 bg-surface p-6 md:p-8 overflow-hidden relative">
            <div class="absolute -right-14 -top-14 w-44 h-44 rounded-full bg-primary/6 blur-2xl"></div>
            <div class="absolute -left-16 -bottom-16 w-52 h-52 rounded-full bg-accent/15 blur-3xl"></div>

            <div class="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-5">
                <div>
                    <h2 class="text-3xl md:text-4xl font-black tracking-tighter text-primary">
                        Resumen operativo
                    </h2>
                    <p class="text-secondary text-sm md:text-base mt-2 font-medium max-w-2xl">
                        Monitorea ventas, actividad y salud de sorteos en tiempo real con foco en decisiones rápidas.
                    </p>
                </div>
            </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            <div class="md:col-span-8 rounded-3xl border border-outline-variant/20 bg-surface p-6 md:p-8">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                            Salud operativa del portafolio
                        </p>
                        <div class="mt-3 flex items-baseline gap-3">
                            <span class="text-3xl md:text-4xl font-black tracking-tighter text-primary">
                                Prioridades de hoy
                            </span>
                        </div>
                    </div>
                    <span
                        class="rounded-full border border-outline-variant/25 bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
                        Actualización cada 15 min
                    </span>
                </div>

                <p class="mt-4 text-sm font-medium text-secondary max-w-2xl">
                    Seguimiento rápido para detectar rifas con riesgo operativo y definir acciones inmediatas del
                    organizador.
                </p>

                <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="rounded-2xl border border-outline-variant/20 bg-background p-4 md:p-5">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Rifas que vencen pronto
                        </p>
                        <p class="mt-2 text-3xl font-black tracking-tight text-primary">
                            {{ formatNumber(dataDashboardMetrics.activeRafflesExpiringSoon) }}
                        </p>
                        <p class="mt-2 text-xs text-secondary">
                            Expiran en las próximas 48 horas.
                        </p>
                    </div>

                    <div class="rounded-2xl border border-outline-variant/20 bg-background p-4 md:p-5">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Agotamiento estimado
                        </p>
                        <p class="mt-2 text-3xl font-black tracking-tight text-primary">
                            {{ formatDays(dataDashboardMetrics.estimatedDepletionDays) }}
                        </p>
                        <p class="mt-2 text-xs text-secondary">
                            Promedio para agotar boletos en rifas activas.
                        </p>
                    </div>

                    <div class="rounded-2xl border border-outline-variant/20 bg-background p-4 md:p-5">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Boletos estancados
                        </p>
                        <p class="mt-2 text-3xl font-black tracking-tight text-primary">
                            {{ formatNumber(dataDashboardMetrics.stagnantTickets) }}
                        </p>
                        <p class="mt-2 text-xs text-secondary">
                            Reservados o pendientes sin confirmación de venta.
                        </p>
                    </div>

                    <div class="rounded-2xl border border-outline-variant/20 bg-background p-4 md:p-5">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Rifas activas sin premios
                        </p>
                        <p class="mt-2 text-3xl font-black tracking-tight text-primary">
                            {{ formatNumber(dataDashboardMetrics.activeRafflesWithoutPrizes) }}
                        </p>
                        <p class="mt-2 text-xs text-secondary">
                            Requieren asignación de premio para publicar con confianza.
                        </p>
                    </div>
                </div>
            </div>

            <div
                class="md:col-span-4 rounded-3xl border border-primary/20 bg-primary text-on-primary p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-on-primary/70">
                        Ingresos brutos (USD)
                    </p>
                    <p class="mt-4 text-4xl md:text-5xl font-black tracking-tighter">
                        $ {{ dataDashboardMetrics.totalAmount }}
                    </p>
                </div>
                <div class="pt-5 mt-5 border-t border-white/20">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-on-primary/70">
                            Ticket promedio
                        </span>
                        <span class="text-lg md:text-xl font-bold">
                            $ {{ dataDashboardMetrics.averageTicketPrice }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="md:col-span-4 rounded-2xl border border-outline-variant/20 bg-surface p-6 md:p-7">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-widest text-secondary">
                        Sorteos activos
                    </p>
                    <span
                        class="rounded-full bg-primary text-on-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest">Live</span>
                </div>
                <p class="mt-3 text-4xl font-black text-primary">
                    {{ formatNumber(dataDashboardMetrics.totalRaffles) }}
                </p>
                <p class="mt-3 text-sm text-secondary leading-relaxed">
                    {{ formatNumber(dataDashboardMetrics.activeRafflesExpiringSoon) }} sorteos concluyen en las próximas
                    <span class="font-bold text-primary">2 horas</span>.
                </p>
            </div>

            <div class="md:col-span-4 rounded-2xl border border-outline-variant/20 bg-surface p-6 md:p-7">
                <p class="text-xs font-bold uppercase tracking-widest text-secondary">
                    Participantes únicos
                </p>
                <p class="mt-3 text-4xl font-black text-primary">
                    {{ formatNumber(dataDashboardMetrics.totalUniqueParticipants) }}
                </p>                
            </div>

            <div class="md:col-span-4 rounded-2xl border border-outline-variant/20 bg-surface p-6 md:p-7">
                <p class="text-xs font-bold uppercase tracking-widest text-secondary">
                    Tasa de venta efectiva
                </p>
                <p class="mt-3 text-4xl font-black text-primary">
                    {{ formatPercent(dataDashboardMetrics.effectiveSalesRate) }}
                </p>
                <p class="mt-3 text-sm text-secondary leading-relaxed">
                    Rendimiento histórico promedio en sorteos de categoría premium.
                </p>
            </div>
        </section>

        <section class="rounded-3xl border border-outline-variant/20 bg-surface overflow-hidden">
            <div class="p-5 md:p-7 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 class="text-sm font-bold uppercase tracking-[0.18em] text-primary">Actividad reciente de sorteos
                </h3>
            </div>

            <div class="divide-y divide-outline-variant/10">
                <div v-if="!loading && rafflesGenericsRecent.length > 0" v-for="raffle in rafflesGenericsRecent"
                    :key="raffle.id"
                    class="p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-surface-variant/20 transition-colors">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-11 h-11 rounded-xl border border-outline-variant/20 bg-background flex items-center justify-center text-primary">
                            <img class="w-full h-full object-cover"
                                data-alt="minimalist studio photography of a luxury minimalist white wristwatch on a grey stone pedestal"
                                :src="raffle.imageUrl" />
                        </div>
                        <div>
                            <h4 class="text-base font-bold tracking-tight text-primary">
                                {{ raffle.title }}
                            </h4>
                            <p class="text-[10px] font-bold uppercase tracking-widest text-secondary mt-1">
                                ID Sorteo: {{ raffle.slug }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-6 lg:gap-8">
                        <div>
                            <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Estado</p>
                            <p class="mt-1 text-xs font-bold uppercase tracking-widest text-primary">
                                {{ raffle.status }}
                            </p>
                        </div>
                        <div>
                            <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Boletos</p>
                            <p class="mt-1 text-xs font-bold text-primary">
                                {{ raffle.totalSold }} / {{ raffle.quantityTickets }}</p>
                        </div>
                        <button type="button"
                            @click="$router.push({ name: 'dashboard-manage-numbers', params: { id: raffle.id } })"
                            class="px-3 py-2 rounded-lg border border-outline-variant/20 bg-background text-xs font-bold text-primary hover:bg-primary hover:text-on-primary transition-colors">Ver</button>
                    </div>
                </div>
                <div v-if="!loading && rafflesGenericsRecent.length === 0"
                    class="flex flex-col items-center justify-center gap-4 py-16">
                    <p class="text-sm font-medium text-secondary">No hay actividad reciente de sorteos.</p>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import useOrganizerStore from '@/store/organizer';
import useRaffleStore from '@/store/raffle';
import useAuthStore from '@/store/auth';

const authStore = useAuthStore();
const organizerStore = useOrganizerStore();
const raffleStore = useRaffleStore();

const { authenticated } = storeToRefs(authStore);
const { dataDashboardMetrics } = storeToRefs(organizerStore);
const { rafflesGenericsRecent, loading } = storeToRefs(raffleStore);

const formatNumber = (value: number) => value.toLocaleString("es-ES");
const formatPercent = (value: number) => `${value.toFixed(1)}%`;
const formatDays = (value: number) => `${value.toFixed(1)} días`;

const getData = async () => {
    await organizerStore.getOrganizerDashboardMetrics();
    await raffleStore.getRafflesGenericsRecent();
};

watch(
    authenticated,
    (isAuthenticated) => {
        if (isAuthenticated) {
            getData();
        }
    },
    { immediate: true },
);
</script>
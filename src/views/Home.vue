<template>
    <div class="min-h-screen bg-background font-['Outfit'] text-on-background flex flex-col overflow-x-hidden">
        <Header />

        <main class="flex-1" id="main-content">
            <section aria-label="Hero principal"
                class="relative px-4 md:px-8 pt-14 pb-18 md:pt-20 md:pb-24 overflow-hidden">
                <div class="absolute inset-0 bg-surface-variant/35 -z-10"></div>
                <div
                    class="absolute -left-20 -top-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/15 blur-3xl -z-10">
                </div>
                <div
                    class="absolute -right-28 top-10 w-80 h-80 md:w-120 md:h-120 rounded-full bg-primary/8 blur-3xl -z-10">
                </div>

                <div class="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
                    <div class="text-center lg:text-left">
                        <div
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/85 border border-outline-variant/30 text-[11px] font-bold tracking-[0.16em] uppercase text-secondary">
                            <span class="relative flex h-2.5 w-2.5">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-65"></span>
                                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                            </span>
                            +1.2M en premios entregados
                        </div>

                        <h1 class="mt-5 text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.04]">
                            Gana premios <br class="hidden lg:block" />
                            <span class="text-primary">de otro nivel.</span>
                        </h1>

                        <p class="mt-5 text-base md:text-lg text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Sorteos premium, transparentes y en vivo. En SpinLuck puedes participar por autos,
                            tecnología y efectivo con una experiencia rápida, segura y verificable.
                        </p>

                        <div class="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                            <a href="#sorteos" role="button" aria-label="Ver todos los sorteos activos"
                                class="px-8 py-3.5 bg-primary text-on-primary font-bold rounded-xl border border-primary hover:opacity-90 active:scale-[0.99] transition-all text-center">
                                Ver sorteos activos
                            </a>
                            <a href="#how-it-works" role="button" aria-label="Cómo funciona SpinLuck"
                                class="px-8 py-3.5 bg-surface text-primary border border-outline-variant/40 font-bold rounded-xl hover:bg-surface-variant/55 transition-colors text-center">
                                Cómo funciona
                            </a>
                        </div>

                        <dl class="mt-8 grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0"
                            aria-label="Estadísticas de SpinLuck">
                            <div class="bg-surface/90 border border-outline-variant/20 rounded-xl p-3.5 text-center">
                                <dt class="text-[11px] md:text-xs text-secondary uppercase tracking-widest order-2">
                                    Jugadores</dt>
                                <dd class="text-xl md:text-2xl font-black text-primary order-1">10k+</dd>
                            </div>
                            <div class="bg-surface/90 border border-outline-variant/20 rounded-xl p-3.5 text-center">
                                <dt class="text-[11px] md:text-xs text-secondary uppercase tracking-widest order-2">
                                    Ganadores</dt>
                                <dd class="text-xl md:text-2xl font-black text-primary order-1">450+</dd>
                            </div>
                            <div class="bg-surface/90 border border-outline-variant/20 rounded-xl p-3.5 text-center">
                                <dt class="text-[11px] md:text-xs text-secondary uppercase tracking-widest order-2">
                                    Valoración</dt>
                                <dd class="text-xl md:text-2xl font-black text-primary order-1">4.9/5</dd>
                            </div>
                        </dl>
                    </div>

                    <aside aria-label="Sorteo destacado" class="relative w-full max-w-135 mx-auto">
                        <div
                            class="relative overflow-hidden rounded-3xl border border-outline-variant/25 bg-surface p-5 md:p-6">
                            <div
                                class="absolute inset-0 bg-linear-to-br from-accent/8 via-surface to-surface-variant/25">
                            </div>

                            <article
                                class="relative rounded-2xl border border-outline-variant/20 bg-background/75 p-5 md:p-6">
                                <div class="flex items-center justify-between">
                                    <p class="text-xs font-bold uppercase tracking-widest text-secondary">Sorteo
                                        destacado</p>
                                    <span aria-label="Sorteo en vivo ahora"
                                        class="px-2.5 py-1 rounded-full bg-accent/20 text-[10px] font-bold tracking-[0.16em] uppercase text-primary">Live</span>
                                </div>

                                <h2 class="mt-3 text-2xl md:text-3xl font-black tracking-tight">Porsche 911 GT3</h2>
                                <p class="mt-1 text-sm md:text-base text-secondary">Cierre en 2 días 14 horas</p>

                                <div class="mt-5 rounded-xl border border-outline-variant/20 bg-surface p-4"
                                    role="meter" aria-valuenow="1240" aria-valuemin="0" aria-valuemax="5000"
                                    aria-label="Boletos vendidos: 1,240 de 5,000">
                                    <div
                                        class="flex justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                                        <span>Boletos vendidos</span>
                                        <span>1,240 / 5,000</span>
                                    </div>
                                    <div class="mt-2 h-2.5 rounded-full bg-surface-variant overflow-hidden">
                                        <div class="h-full w-[24.8%] bg-primary rounded-full"></div>
                                    </div>
                                </div>

                                <dl class="mt-5 grid grid-cols-2 gap-3">
                                    <div class="rounded-xl border border-outline-variant/20 bg-surface p-3">
                                        <dt class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                                            Precio ticket</dt>
                                        <dd class="mt-1 text-lg font-black">$9.99</dd>
                                    </div>
                                    <div class="rounded-xl border border-outline-variant/20 bg-surface p-3">
                                        <dt class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                                            Premio estimado</dt>
                                        <dd class="mt-1 text-lg font-black">$240k</dd>
                                    </div>
                                </dl>
                            </article>
                        </div>
                    </aside>
                </div>
            </section>

            <section id="how-it-works" aria-label="Cómo participar en SpinLuck"
                class="py-16 md:py-22 px-4 md:px-8 bg-surface border-y border-outline-variant/15">
                <div class="max-w-300 mx-auto text-center">
                    <p class="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em]">Proceso simple</p>
                    <h2 class="mt-3 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">Participa en 3 pasos
                    </h2>

                    <ol class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 list-none"
                        aria-label="Pasos para participar">
                        <li
                            class="group rounded-2xl border border-outline-variant/20 bg-background p-6 md:p-7 text-left transition-all hover:-translate-y-1 hover:border-outline-variant/40">
                            <p class="text-xs font-bold uppercase tracking-[0.18em] text-secondary" aria-hidden="true">
                                Paso 01</p>
                            <h3 class="mt-3 text-xl font-black">Elige tu sorteo</h3>
                            <p class="mt-2 text-sm leading-relaxed text-secondary">Explora sorteos activos de autos,
                                gadgets y premios en efectivo.</p>
                        </li>

                        <li
                            class="group rounded-2xl border border-outline-variant/20 bg-background p-6 md:p-7 text-left transition-all hover:-translate-y-1 hover:border-outline-variant/40">
                            <p class="text-xs font-bold uppercase tracking-[0.18em] text-secondary" aria-hidden="true">
                                Paso 02</p>
                            <h3 class="mt-3 text-xl font-black">Compra tus números</h3>
                            <p class="mt-2 text-sm leading-relaxed text-secondary">Selecciona tus tickets, confirma tu
                                respuesta y entra al sorteo.</p>
                        </li>

                        <li
                            class="group rounded-2xl border border-primary/20 bg-primary text-on-primary p-6 md:p-7 text-left transition-all hover:-translate-y-1">
                            <p class="text-xs font-bold uppercase tracking-[0.18em] text-on-primary/70"
                                aria-hidden="true">Paso 03</p>
                            <h3 class="mt-3 text-xl font-black">Mira el live y gana</h3>
                            <p class="mt-2 text-sm leading-relaxed text-on-primary/80">Sigue el sorteo verificado en
                                tiempo real y reclama tu premio al instante.</p>
                        </li>
                    </ol>
                </div>
            </section>

            <section id="trust" aria-label="Confianza y transparencia" class="py-16 md:py-22 px-4 md:px-8">
                <div class="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-black tracking-tight">Transparencia total en cada sorteo
                        </h2>
                        <p class="mt-4 text-base md:text-lg text-secondary leading-relaxed">
                            Cada resultado se realiza con verificación pública para que juegues con confianza, sin
                            letras pequeñas ni procesos opacos.
                        </p>

                        <ul class="mt-7 space-y-3">
                            <li
                                class="flex items-center gap-3 rounded-xl border border-outline-variant/15 bg-surface p-3.5">
                                <div class="w-5 h-5 shrink-0 rounded-full bg-surface-variant text-primary p-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="3" stroke="currentColor" class="w-full h-full">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <span class="text-sm md:text-base font-medium">Sorteos transmitidos en vivo</span>
                            </li>
                            <li
                                class="flex items-center gap-3 rounded-xl border border-outline-variant/15 bg-surface p-3.5">
                                <div class="w-5 h-5 shrink-0 rounded-full bg-surface-variant text-primary p-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="3" stroke="currentColor" class="w-full h-full">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <span class="text-sm md:text-base font-medium">Historial de ganadores verificable</span>
                            </li>
                            <li
                                class="flex items-center gap-3 rounded-xl border border-outline-variant/15 bg-surface p-3.5">
                                <div class="w-5 h-5 shrink-0 rounded-full bg-surface-variant text-primary p-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="3" stroke="currentColor" class="w-full h-full">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                <span class="text-sm md:text-base font-medium">Pagos seguros y cifrados</span>
                            </li>
                        </ul>
                    </div>

                    <dl class="grid grid-cols-2 gap-4" aria-label="Métricas de confianza">
                        <div class="rounded-2xl border border-outline-variant/20 bg-surface p-5 text-center">
                            <dd class="text-3xl md:text-4xl font-black text-primary">450+</dd>
                            <dt
                                class="mt-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-secondary">
                                Ganadores</dt>
                        </div>
                        <div class="rounded-2xl border border-outline-variant/20 bg-surface p-5 text-center">
                            <dd class="text-3xl md:text-4xl font-black text-primary">4.9/5</dd>
                            <dt
                                class="mt-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-secondary">
                                Confianza</dt>
                        </div>
                        <div class="rounded-2xl border border-outline-variant/20 bg-surface p-5 text-center">
                            <dd class="text-3xl md:text-4xl font-black text-primary">$1.2M</dd>
                            <dt
                                class="mt-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-secondary">
                                Premios</dt>
                        </div>
                        <div class="rounded-2xl border border-primary/20 bg-primary text-on-primary p-5 text-center">
                            <dd class="text-3xl md:text-4xl font-black">100%</dd>
                            <dt
                                class="mt-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-on-primary/70">
                                Seguro</dt>
                        </div>
                    </dl>
                </div>
            </section>

            <section aria-label="Llamada a la acción" class="relative px-4 md:px-8 pb-16 md:pb-20">
                <div
                    class="max-w-220 mx-auto rounded-3xl border border-outline-variant/20 bg-surface-variant/70 p-8 md:p-12 text-center overflow-hidden relative">
                    <div class="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-accent/20 blur-2xl"></div>
                    <div class="absolute -right-14 -top-12 w-44 h-44 rounded-full bg-primary/10 blur-2xl"></div>

                    <div class="relative z-10">
                        <h2 class="text-3xl md:text-5xl font-black tracking-tight">¿Listo para tu próxima gran victoria?
                        </h2>
                        <p class="mt-4 text-base md:text-xl text-secondary max-w-2xl mx-auto">
                            Crea tu cuenta hoy y recibe un 10% extra en tu primer depósito para empezar a participar.
                        </p>
                        <a href="/registro" role="button" aria-label="Crear cuenta en SpinLuck y comenzar a participar"
                            class="mt-8 inline-block px-8 py-3.5 md:px-10 md:py-4 bg-primary text-on-primary font-bold text-base md:text-lg rounded-xl border border-primary hover:opacity-90 transition-opacity">
                            Comenzar ahora
                        </a>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped></style>
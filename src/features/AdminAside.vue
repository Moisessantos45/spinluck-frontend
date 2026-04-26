<template>
  <aside
    class="w-64 h-full flex flex-col bg-surface border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden shrink-0 relative z-20">
    <div class="p-8 pb-4">
      <h1 class="text-xl font-black tracking-tighter text-primary uppercase">SpinLuck</h1>
      <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mt-1">Gestión de Sorteos</p>
    </div>

    <nav class="flex-1 px-4 mt-6 space-y-1 overflow-y-auto no-scrollbar">

      <RouterLink
        class="flex items-center gap-3 px-4 py-3 text-secondary font-medium hover:text-primary hover:bg-surface-variant/50 rounded-xl transition-all"
        exact-active-class="!bg-surface-variant !text-primary !font-bold shadow-sm" to="/dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
        <span>Panel de Control</span>
      </RouterLink>

      <RouterLink
        class="flex items-center gap-3 px-4 py-3 text-secondary font-medium hover:text-primary hover:bg-surface-variant/50 rounded-xl transition-all"
        active-class="!bg-surface-variant !text-primary !font-bold shadow-sm" :to="{ name: 'dashboard-raffles' }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
        <span>Sorteos</span>
      </RouterLink>

      <RouterLink
        class="flex items-center gap-3 px-4 py-3 text-secondary font-medium hover:text-primary hover:bg-surface-variant/50 rounded-xl transition-all"
        active-class="!bg-surface-variant !text-primary !font-bold shadow-sm" :to="{ name: 'dashboard-profile' }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21c-2.676 0-5.216-.584-7.499-1.882z" />
        </svg>
        <span>Perfil</span>
      </RouterLink>
    </nav>

    <div class="p-6 mt-auto">
      <RouterLink :to="{ name: 'dashboard-add-raffle' }"
        class="w-full py-4 px-4 bg-primary text-on-primary rounded-xl font-bold text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-6 shadow-md shadow-primary/20"
        active-class="bg-primary/80">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Crear Sorteo
      </RouterLink>
    </div>
  </aside>
</template>
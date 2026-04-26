<template>
    <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2 w-full" aria-label="Navegación de páginas">
        <button
            class="flex items-center justify-center w-9 h-9 rounded-lg border border-border-soft bg-white text-ink-tertiary text-sm font-medium transition-all hover:border-primary/20 hover:text-primary hover:bg-primary/5 disabled:opacity-35 disabled:cursor-not-allowed"
            :disabled="page === 1" @click="changePage(page - 1)" aria-label="Página anterior">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        <button v-for="p in totalPages" :key="p" @click="changePage(p)" :aria-current="p === page ? 'page' : undefined"
            :class="p === page
                ? 'bg-primary text-white border-primary font-bold'
                : 'bg-white text-ink-tertiary border-border-soft hover:border-primary/20 hover:text-primary hover:bg-primary/5'
                "
            class="flex items-center justify-center w-9 h-9 rounded-lg border text-sm font-medium transition-all">
            {{ p }}
        </button>

        <button
            class="flex items-center justify-center w-9 h-9 rounded-lg border border-border-soft bg-white text-ink-tertiary text-sm font-medium transition-all hover:border-primary/20 hover:text-primary hover:bg-primary/5 disabled:opacity-35 disabled:cursor-not-allowed"
            :disabled="page === totalPages
                " @click="changePage(page + 1)" aria-label="Página siguiente">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </nav>
</template>

<script setup lang="ts">

defineProps<{
    total: number;
    page: number;
    totalPages: number;
    changePage: (page: number) => void;
}>();

</script>
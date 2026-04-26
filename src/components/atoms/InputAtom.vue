<template>
    <input v-model="model" v-bind="$attrs"
        class="block w-full px-3.5 py-2.5 border border-border-soft rounded-lg text-ink-primary bg-background-light hover:bg-white hover:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 placeholder:text-ink-muted text-sm transition-all duration-150 outline-none" />
</template>

<script setup lang="ts">
const model = defineModel<string | number>();
</script>

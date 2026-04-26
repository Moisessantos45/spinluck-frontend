<template>
    <main class="flex flex-col h-screen w-full overflow-hidden bg-background-light">
        <slot name="header" />

        <section class="flex flex-1 min-h-0 gap-3 p-3 pt-0">
            <Transition enter-active-class="transition-transform duration-250 ease-out"
                enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
                leave-active-class="transition-transform duration-200 ease-in" leave-from-class="translate-x-0"
                leave-to-class="-translate-x-full">
                <div v-show="sidebarOpen || isDesktop" class="fixed inset-y-0 left-0 z-40 flex flex-col pt-15 ml:relative ml:inset-auto ml:z-auto ml:pt-0 ml:flex">
                    <slot name="aside" />
                </div>
            </Transition>

            <div v-if="sidebarOpen && !isDesktop" class="fixed inset-0 z-30 bg-ink-primary/30 backdrop-blur-[2px]"
                @click="$emit('closeSidebar')" />

            <div class="flex-1 self-stretch min-w-0 overflow-y-auto flex flex-col">
                <slot />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps<{ sidebarOpen: boolean }>();
defineEmits(['closeSidebar']);

const isDesktop = ref(false);

function checkDesktop() {
    isDesktop.value = window.innerWidth >= 896;
}

onMounted(() => {
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkDesktop);
});
</script>

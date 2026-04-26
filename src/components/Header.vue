<template>
    <header
        class="h-20 px-4 md:px-8 flex items-center justify-between bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 sticky top-0 z-50">
        <RouterLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>
            </div>
            <h1 class="text-xl md:text-2xl font-black tracking-tighter text-primary">SpinLuck</h1>
        </RouterLink>

        <div class="flex items-center gap-3 md:gap-4">
            <RouterLink to="/login"
                class="text-xs md:text-sm font-bold text-secondary hover:text-primary transition-colors">Log
                In</RouterLink>
            <RouterLink to="/register"
                class="px-4 py-2 md:px-6 md:py-2.5 bg-primary text-on-primary text-xs md:text-sm font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                Sign Up
            </RouterLink>
        </div>
    </header>

</template>
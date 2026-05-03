<template>
    <Loading v-if="loading" />
    <LayoutAuth v-else-if="authenticated" :sidebar-open="sidebarOpen" @close-sidebar="sidebarOpen = false">
        <template #header>
            <AuthHeader title="Portal de Administradores" userName="John Doe"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCgkKPumniowuGIT12CDdkdK7Isn_z0Eh_rmg-1DeZ2Zvb3fqVdAnHOzW3af_L47jxXRvfKNLOpiX8-sbRh8vMZiGmLDS1fTB2slnh5NrYQANKJJdFS9HyLK7iidRjbAFAjCA6_Ptbi7i2SiRJMQsiAd7hiJd_orza5ydYJK89fjlNpPOdxu_oE5iB72EbFussKQPWbJomKKUmtmL1vOAwmn5-rd6Z2dof_sHJEr_PuVqrIZ_WI5d9SSBONl1lNw6DW5JpHbGfPb_g"
                @toggle-sidebar="sidebarOpen = !sidebarOpen" @logout="logout" />
        </template>
        <template #aside>
            <AdminAside />
        </template>

        <template class="md:p-8 p-4 flex flex-col gap-6 bg-background-light">
            <RouterView />
        </template>

    </LayoutAuth>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import LayoutAuth from '@/components/templates/LayoutAuth.vue';
import AuthHeader from '@/components/organisms/AuthHeader.vue';
import AdminAside from './AdminAside.vue';
import Loading from '@/components/molecules/Loading.vue';
import useAuthStore from '@/store/auth';
import useOrganizerStore from '@/store/organizer';

const router = useRouter();
const authStore = useAuthStore();
const organizerStore = useOrganizerStore();
const { authData, authenticated, loading, alertMessage } = storeToRefs(authStore);

const sidebarOpen = ref(false);

const getData = async () => {
    if (!authenticated.value) {
        await authStore.getSession();
    }

    if (authData.value.fullProfile) {
        await organizerStore.getOrganizer();
    }
};

const logout = async () => {
    await authStore.logout();
    if (!alertMessage.value.error) {
        router.push('/login');
    }
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

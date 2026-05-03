<template>
    <section class="w-full flex flex-col gap-6 md:gap-8">
        <div class="rounded-3xl border border-outline-variant/20 bg-surface p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div>
                    <h2 class="text-3xl md:text-4xl font-black leading-tight tracking-tight text-primary">Nuevo sorteo
                    </h2>
                    <p class="text-secondary max-w-2xl mt-2 leading-relaxed font-medium text-sm md:text-base">
                        Define datos base, banner principal y premios para publicar una nueva rifa con estructura clara.
                    </p>
                </div>
                <div class="grid grid-cols-3 gap-2.5 w-full md:w-auto md:min-w-90">
                    <div class="rounded-xl border border-outline-variant/20 bg-background px-3 py-2.5 text-center">
                        <p class="text-lg md:text-xl font-black text-primary">1</p>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Sorteo</p>
                    </div>
                    <div class="rounded-xl border border-outline-variant/20 bg-background px-3 py-2.5 text-center">
                        <p class="text-lg md:text-xl font-black text-primary">{{ prizes.length }}</p>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Premios</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7">
            <div class="md:col-span-8 space-y-6">
                <section class="rounded-3xl border border-outline-variant/20 bg-surface p-6 md:p-7 space-y-6">
                    <div>
                        <h3 class="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-primary">
                            Información principal
                        </h3>
                        <p class="text-xs text-secondary font-medium mt-1">
                            Configura el banner, nombre y precio base del boleto.
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-bold uppercase tracking-widest text-primary block mb-3">
                            Banner principal del sorteo
                        </label>
                        <ImageUploadCard id="banner-upload" title="Subir banner horizontal"
                            description="Resolución recomendada: 1920x1080px. Formatos: JPG, PNG o WEBP."
                            accept="image/*" className="w-full" heightClass="h-44" :preview="dataForm.imageUrl"
                            @file-selected="handleBannerImageUpload" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="space-y-2">
                            <InputField label="Titulo del sorteo" id="title" required type="text"
                                v-model="dataForm.title" placeholder="ej. Gran Sorteo Vantablack" />
                        </div>
                        <div class="space-y-2">
                            <InputField label="Precio" id="price" required type="number" inputmode="decimal"
                                v-model="dataForm.price" placeholder="50.00" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="space-y-2">
                            <InputField label="Fecha del sorteo" id="date" required type="date"
                                v-model="dataForm.date" />
                        </div>
                        <div class="space-y-2">
                            <InputField label="Numero de tickets" id="quantityTickets" required type="number"
                                v-model="dataForm.quantityTickets" placeholder="1000" />
                        </div>
                        <div class="space-y-2">
                            <InputField label="Numero de ganadores" id="maxWinners" required type="number"
                                v-model="dataForm.maxWinners" placeholder="1" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-bold uppercase tracking-widest text-primary">
                            Estado del sorteo
                        </label>
                        <div class="flex flex-wrap gap-3">
                            <button v-for="status in stateRaffle" :key="status.id" type="button"
                                @click="dataForm.riffleStatusId = status.id" :class="['px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all',
                                    dataForm.riffleStatusId === status.id
                                        ? 'bg-primary border-primary text-on-primary'
                                        : 'bg-background border-outline-variant/20 text-secondary hover:border-primary/50 hover:text-primary'
                                ]">
                                {{ status.name }}
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-bold uppercase tracking-widest text-primary">
                            Descripción general
                        </label>
                        <textarea v-model="dataForm.description"
                            class="w-full bg-background border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                            placeholder="Describe los términos, condiciones y la esencia del sorteo..."
                            rows="4"></textarea>
                    </div>

                    <div class="flex items-center justify-between pt-1">
                        <button
                            @click="clearData" type="button"
                            class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Cancelar
                        </button>
                        <button type="button" @click="handleClickSaveRaffle" :disabled="loadingRaffle"
                            class="px-8 py-3.5 bg-primary text-on-primary text-[11px] font-bold uppercase tracking-widest rounded-xl border border-primary hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ loadingRaffle ? 'Guardando...' :
                                dataForm.id === -1 ? 'Guardar sorteo' : 'Actualizar sorteo' }}
                        </button>
                    </div>
                </section>

                <section v-if="dataForm.id != -1"
                    class="rounded-3xl border border-outline-variant/20 bg-surface p-6 md:p-7 space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-xl md:text-2xl font-black tracking-tight text-primary">Premios del sorteo
                            </h3>
                            <p class="text-secondary text-xs mt-1 font-medium">El primer premio de la lista se considera
                                premio mayor.</p>
                        </div>
                        <span
                            class="px-3 py-1 rounded-full bg-background border border-outline-variant/20 text-[10px] font-bold uppercase tracking-widest text-secondary">{{
                                prizes.length }} cargados</span>
                    </div>

                    <div class="rounded-2xl border border-outline-variant/20 bg-surface-variant/30 p-5 md:p-6">
                        <h4 class="text-[11px] font-bold uppercase tracking-widest text-primary mb-5">Agregar nuevo
                            premio</h4>

                        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            <div class="md:col-span-4">
                                <ImageUploadCard id="prize-upload" title="Subir imagen"
                                    description="PNG/JPG mínimo 800x800px" accept="image/*"
                                    :preview="dataFormPrize.imageUrl" @file-selected="handlePrizeImageUpload" />
                            </div>

                            <div class="md:col-span-8 space-y-4">
                                <div class="space-y-2">
                                    <InputField label="Titulo del premio" id="titlePrize" required type="text"
                                        v-model="dataFormPrize.title" placeholder="ej. Reloj de Lujo" />
                                </div>

                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-bold uppercase tracking-widest text-primary">Descripción
                                        del premio</label>
                                    <textarea v-model="dataFormPrize.description"
                                        class="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                                        placeholder="Detalles, condición y especificaciones..." rows="3"></textarea>
                                </div>

                                <div class="flex justify-end pt-1 gap-2">
                                    <button v-if="dataFormPrize.id != -1" @click="prizeStore.clearDataFormPrize"
                                        type="button"
                                        class="px-6 py-2.5 bg-background border border-outline-variant/20 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-surface-variant/50 transition-colors">
                                        Limpiar
                                    </button>
                                    <button type="button" @click="handleClickSavePrize" :disabled="loadingPrize"
                                        class="px-6 py-2.5 bg-surface border border-outline-variant/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-surface-variant/50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        {{ loadingPrize ? 'Añadiendo...' :
                                            dataFormPrize.id != -1 ? 'Actualizar premio' : 'Añadir premio' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="prizes.length > 0" class="space-y-3 max-h-96 overflow-y-auto pr-1">
                        <div v-for="(prize, index) in prizes" :key="index"
                            class="rounded-2xl border border-outline-variant/20 bg-background p-4 flex flex-col sm:flex-row gap-4 items-center">
                            <div
                                class="w-22 h-22 rounded-xl overflow-hidden bg-surface border border-outline-variant/20 shrink-0">
                                <img :src="prize.imageUrl" class="w-full h-full object-cover grayscale"
                                    alt="Prize image" />
                            </div>
                            <div class="flex-1 text-center sm:text-left">
                                <span
                                    class="inline-flex px-2 py-1 bg-surface-variant/50 text-secondary text-[9px] font-bold uppercase tracking-widest rounded mb-2">
                                    Premio #{{ index + 1 }}
                                </span>
                                <h4 class="text-base md:text-lg font-bold text-primary">
                                    {{ prize.title.length > 50 ? prize.title.slice(0, 50) + '...' : prize.title }}
                                </h4>
                                <p class="text-xs text-secondary mt-1 max-w-xl line-clamp-2">{{ prize.description }}</p>
                            </div>
                            <div class="flex flex-col gap-2">
                                <button @click="handleDeletePrize(prize.id)"
                                    class="p-3 text-secondary hover:text-error hover:bg-error/10 rounded-xl transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>

                                <button @click="prizeStore.setDataFormPrize(prize)"
                                    class="p-3 text-secondary hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 .375a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <aside class="md:col-span-4 space-y-6">
                <section class="rounded-2xl border border-outline-variant/20 bg-surface p-6">
                    <h3 class="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Vista previa rápida</h3>
                    <div class="mt-4 rounded-xl border border-outline-variant/15 bg-background p-4">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Slug del sorteo
                        </p>
                        <p class="text-sm font-bold text-primary mt-1">
                            {{ dataForm.slug || 'Slug del sorteo' }}
                        </p>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Título
                        </p>
                        <p class="text-sm font-bold text-primary mt-1">
                            {{ dataForm.title || 'Título del sorteo' }}
                        </p>

                        <div class="mt-4">
                            <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Precio boleto</p>
                            <p class="text-sm font-black text-primary mt-1">
                                {{ dataForm.price ? `$${dataForm.price}` : 'Precio del boleto' }}
                            </p>
                        </div>

                        <div class="mt-4">
                            <p class="text-[10px] font-bold uppercase tracking-widest text-secondary">Premio mayor</p>
                            <p class="text-sm font-semibold text-primary mt-1 line-clamp-2">
                                {{ prizes[0]?.title || 'Aún no definido' }}
                            </p>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import { useToast } from "vue-toastification"
import InputField from '@/components/molecules/InputField.vue';
import ImageUploadCard from '@/components/molecules/ImageUploadCard.vue';
import useRaffleStore from '@/store/raffle';
import usePrizeStore from '@/store/prize';
import useStorageStore from '@/store/storage';

const router = useRouter()
const route = useRoute()
const toast = useToast();

const raffleStore = useRaffleStore();
const prizeStore = usePrizeStore();
const storageStore = useStorageStore();

const { dataForm, stateRaffle, loading: loadingRaffle, alertMessage: alertRaffle } = storeToRefs(raffleStore);
const { prizes, dataFormPrize, loading: loadingPrize, alertMessage: alertPrize } = storeToRefs(prizeStore);
const { fileUrl } = storeToRefs(storageStore);

const setToast = (msg: string, error = false) => {
    error ? toast.error(msg) : toast.success(msg);
};

const handleBannerImageUpload = async (file: File | null) => {
    if (!file) return;

    const fileId = dataForm.value.imageUrl.split('/').slice(-1)[0];
    const result = await (dataForm.value.imageUrl.trim() == "" ?
        storageStore.uploadFile(file) : storageStore.uploadFileUpdate(file, fileId))

    if (result.isSuccess) {
        dataForm.value.imageUrl = fileUrl.value;
        setToast("Imagen del banner actualizada correctamente");
    } else {
        setToast(alertRaffle.value?.msg || "Error al subir la imagen del banner", true);
    }

};

const handlePrizeImageUpload = async (file: File | null) => {
    if (!file) return;

    const fileId = dataFormPrize.value.imageUrl.split('/').slice(-1)[0];
    const result = await (dataFormPrize.value.imageUrl.trim() == "" ?
        storageStore.uploadFile(file) : storageStore.uploadFileUpdate(file, fileId));

    if (result.isSuccess) {
        dataFormPrize.value.imageUrl = fileUrl.value;
        setToast("Imagen del premio actualizada correctamente");
    } else {
        setToast(alertPrize.value?.msg || "Error al subir la imagen del premio", true);
    }
};

const handleClickSaveRaffle = async () => {
    let result;

    if (dataForm.value.id != -1) {
        result = await raffleStore.updateRaffle();
        if (result.isSuccess) {
            toast.success("Sorteo creado correctamente");
        } else {
            setToast(alertRaffle.value?.msg || "Error al guardar el sorteo", true);
        }
    } else {
        result = await raffleStore.addRaffle();
        if (result.isSuccess) {
            toast.success("Sorteo creado correctamente");
            raffleStore.clearDataForm();
            router.push({
                query: {
                    ...route.query,
                    raffle: dataForm.value.id.toString()
                }
            });
        } else {
            setToast(alertRaffle.value?.msg || "Error al guardar el sorteo", true);
        }
    }
};

const handleClickSavePrize = async () => {
    dataFormPrize.value.raffleId = dataForm.value.id;
    const result = await (dataFormPrize.value.id != -1 ? prizeStore.updatePrize() : prizeStore.addPrize());
    if (result.isSuccess) {
        setToast(dataFormPrize.value.id != -1 ? "Premio actualizado correctamente" : "Premio añadido correctamente");
        prizeStore.clearDataFormPrize();
        prizeStore.getPrizes(dataForm.value.id);
    } else {
        setToast(alertPrize.value?.msg || "Error al guardar el premio", true);
    }
};

const handleDeletePrize = async (id: number) => {
    if (dataForm.value.id == -1) return;
    const result = await prizeStore.deletePrize(dataForm.value.id, id);
    if (result.isSuccess) {
        setToast("Premio eliminado correctamente");
        prizeStore.getPrizes(dataForm.value.id);
    } else {
        setToast(alertPrize.value?.msg || "Error al eliminar el premio", true);
    }
};

const clearData = () => {
    raffleStore.clearDataForm();
    prizeStore.clearDataFormPrize();

    router.push({
        query: {
            ...route.query,
            raffle: undefined
        }
    });
};

onMounted(() => {
    raffleStore.getStateRaffles();

    const raffleIdStr = route.query.raffle;
    if (raffleIdStr && typeof raffleIdStr === 'string') {
        const raffleId = parseInt(raffleIdStr, 10);
        if (!isNaN(raffleId)) {
            raffleStore.getRaffle(raffleId);
            prizeStore.getPrizes(raffleId);
        }
    }
});
</script>

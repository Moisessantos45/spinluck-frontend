<template>
    <div class="w-full relative" :class="className">
        <input
            ref="fileInput"
            type="file"
            :id="id"
            :accept="accept"
            class="sr-only"
            @change="onFileChange"
            @focus="isFocused = true"
            @blur="isFocused = false"
        />

        <label
            :for="id"
            class="w-full bg-background rounded-2xl flex flex-col items-center justify-center gap-4 border-2 border-dashed border-outline-variant/30 group cursor-pointer hover:border-primary/50 transition-colors text-center p-5 relative overflow-hidden"
            :class="[heightClass || 'h-44', {
                'ring-4 ring-[rgba(0,103,177,0.15)] border-[rgba(0,103,177,0.3)] bg-white': isFocused,
                'border-primary bg-primary/5': isDragging
            }]"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
        >
            <img v-if="preview" :src="preview" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Preview" />
            
            <div v-if="preview" class="relative z-10 bg-background/80 px-4 py-3 rounded-xl backdrop-blur-sm border border-outline-variant/20">
                <p class="text-sm font-bold text-primary">Cambiar imagen</p>
                <p v-if="fileName" class="text-[10px] font-semibold text-secondary mt-1 truncate max-w-[200px]">{{ fileName }}</p>
            </div>
            
            <template v-else>
                <div class="w-12 h-12 rounded-full bg-surface border border-outline-variant/20 flex items-center justify-center text-primary transition-colors group-hover:bg-[rgba(0,103,177,0.05)] group-hover:text-[rgba(0,103,177,1)] relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </div>
                <div class="relative z-10">
                    <h4 class="text-sm font-bold text-primary">{{ title }}</h4>
                    <p v-if="description" class="text-[10px] text-secondary mt-1 max-w-xs mx-auto">{{ description }}</p>
                    <p v-if="fileName" class="text-[10px] font-semibold text-secondary mt-2 truncate max-w-xs">{{ fileName }}</p>
                </div>
                <span class="text-[9px] font-bold uppercase tracking-widest text-secondary bg-[rgba(0,103,177,0.05)] px-3 py-1 rounded-md relative z-10">Examinar</span>
            </template>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    id: string;
    title: string;
    description?: string;
    accept?: string;
    className?: string;
    heightClass?: string;
    preview?: string;
}>();

const emit = defineEmits<{
    (event: 'file-selected', file: File | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string>('');
const isFocused = ref(false);
const isDragging = ref(false);

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        fileName.value = file.name;
        emit('file-selected', file);
    } else {
        fileName.value = '';
        emit('file-selected', null);
    }
};

const handleDrop = (event: DragEvent) => {
    isDragging.value = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        if (!file) return;
        if (props.accept && file && !validateAccept(file)) {
            return;
        }

        fileName.value = file.name;
        emit('file-selected', file);
        if (fileInput.value) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.value.files = dataTransfer.files;
        }
    }
};

const validateAccept = (file: File) => {
    if (!props.accept) return true;
    const accepted = props.accept.split(',').map(item => item.trim());
    return accepted.some((acceptRule) => {
        if (acceptRule === '*/*') return true;
        if (acceptRule.startsWith('.')) {
            return file.name.toLowerCase().endsWith(acceptRule.toLowerCase());
        }
        if (acceptRule.endsWith('/*')) {
            return file.type.startsWith(acceptRule.replace('/*', '/'));
        }
        return file.type === acceptRule;
    });
};
</script>

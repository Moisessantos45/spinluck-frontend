<template>
    <div class="space-y-1.5 focus-within:text-primary transition-colors" :class="className">
        <LabelAtom v-if="label" :label="label" :id="id" :required="required" />
        <div class="relative">
            <input type="file" :id="id" :accept="accept" :required="required && !fileName" class="sr-only"
                @change="handleFileChange" @focus="isFocused = true" @blur="isFocused = false" ref="fileInput"
                v-bind="$attrs" />
            <label :for="id"
                class="flex items-center justify-between w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-slate-700 bg-slate-50 hover:bg-white hover:border-[rgba(0,103,177,0.3)] sm:text-sm transition-all duration-200 shadow-sm cursor-pointer group"
                :class="{
                    'ring-4 ring-[rgba(0,103,177,0.15)] border-[rgba(0,103,177,0.3)] bg-white': isFocused,
                    'border-primary bg-primary/5': isDragging
                }" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop">
                <div class="flex items-center gap-2 overflow-hidden">
                    <div
                        class="p-1.5 bg-slate-100 text-slate-500 rounded-md group-hover:bg-[rgba(0,103,177,0.05)] group-hover:text-[rgba(0,103,177,1)] transition-colors shrink-0">
                        <UploadIcon v-if="!fileName" class="w-4 h-4" />
                        <FileIcon v-else class="w-4 h-4 text-[rgba(0,103,177,1)]" />
                    </div>
                    <span class="truncate"
                        :class="{ 'text-slate-400': !fileName, 'text-slate-900 font-medium': fileName }">
                        {{ fileName || placeholder || 'Seleccionar archivo...' }}
                    </span>
                </div>
                <div v-if="fileName" class="shrink-0 ml-2 flex items-center">
                    <button type="button" @click.prevent="clearFile"
                        class="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200">
                        <XIcon class="w-4 h-4" />
                    </button>
                </div>
                <div v-else class="shrink-0 ml-2">
                    <span
                        class="text-xs font-semibold text-[rgba(0,103,177,1)] bg-[rgba(0,103,177,0.05)] px-3 py-1 rounded-md">Examinar</span>
                </div>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Upload as UploadIcon, File as FileIcon, X as XIcon } from 'lucide-vue-next';
import LabelAtom from '@/components/atoms/LabelAtom.vue';

defineOptions({
    inheritAttrs: false
});

const props = defineProps<{
    label?: string;
    id: string;
    required?: boolean;
    className?: string;
    accept?: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: File | null): void;
    (e: 'change', event: Event): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string>('');
const isFocused = ref(false);
const isDragging = ref(false);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file) {
            fileName.value = file.name;
            emit('update:modelValue', file as File);
        } else {
            fileName.value = '';
            emit('update:modelValue', null);
        }
    } else {
        fileName.value = '';
        emit('update:modelValue', null);
    }
    emit('change', event);
};

const handleDrop = (event: DragEvent) => {
    isDragging.value = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        if (!file) return;
        if (props.accept && !file.type.match(props.accept.replace('/*', '/.*'))) {
            const extensions = props.accept.split(',').map(ext => ext.trim());
            const fileExtension = '.' + file.name.split('.').pop();
            const acceptType = extensions.some(ext => {
                if (ext.startsWith('.')) return ext.toLowerCase() === fileExtension?.toLowerCase();
                if (ext.endsWith('/*')) return file.type.startsWith(ext.replace('/*', ''));
                return file.type === ext;
            });

            if (!acceptType && props.accept !== '*/*') return;
        }

        fileName.value = file.name;
        emit('update:modelValue', file as File);
        if (fileInput.value) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.value.files = dataTransfer.files;

            const changeEvent = new Event('change', { bubbles: true });
            fileInput.value.dispatchEvent(changeEvent);
        }
    }
}

const clearFile = () => {
    fileName.value = '';
    emit('update:modelValue', null);
    if (fileInput.value) {
        fileInput.value.value = '';
        const changeEvent = new Event('change', { bubbles: true });
        fileInput.value.dispatchEvent(changeEvent);
    }
}
</script>

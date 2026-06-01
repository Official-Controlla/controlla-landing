<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: "",
  },
  imageTags: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

defineEmits(['select']);
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-surface-950 transition-all duration-300 flex flex-col group glow-border"
  >
    <div
      class="h-64 relative overflow-hidden border-b border-surface-200 dark:border-surface-700"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 transition-transform duration-700 group-hover:scale-105"
      />
      <!-- Dark mode image overlay for better text contrast if needed, or just let it be -->
      <div
        class="absolute inset-0 bg-surface-950/20 dark:bg-surface-950/40 pointer-events-none"
      ></div>

      <div class="absolute top-4 left-4 flex gap-2">
        <span
          v-for="(tag, idx) in imageTags"
          :key="idx"
          class="text-[10px] bg-surface-0/90 dark:bg-surface-900/90 backdrop-blur text-surface-900 dark:text-surface-0 px-2 py-1 border border-surface-200 dark:border-surface-700 rounded uppercase tracking-wider shadow-sm font-semibold"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="p-8 flex-grow flex flex-col">
      <div class="flex items-center gap-3 mb-4">
        <div
          class="w-8 h-8 rounded bg-surface-100 dark:bg-surface-800 flex items-center justify-center border border-surface-200 dark:border-surface-700"
        >
          <i :class="['pi', icon, 'text-surface-900 dark:text-surface-0 text-sm']"></i>
        </div>
        <h3
          class="text-2xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight"
        >
          {{ title }}
        </h3>
      </div>

      <p
        class="text-base text-surface-600 dark:text-surface-400 mb-8 flex-grow leading-relaxed"
      >
        {{ description }}
      </p>

      <button
        type="button"
        @click="$emit('select')"
        class="text-xs font-semibold text-surface-900 dark:text-surface-0 hover:text-primary-500 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2 group/link w-max uppercase tracking-wider cursor-pointer"
      >
        {{ $t('caseStudies.readBtn') }}
        <i class="pi pi-arrow-right text-sm group-hover/link:translate-x-1 transition-transform"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
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
  },
  glowPosition: {
    type: String,
    default: "top-right", // 'top-right' | 'bottom-left'
  },
  glowColorClass: {
    type: String,
    default: "bg-primary-500/30",
  },
  tags: {
    type: Array as PropType<
      Array<{
        label: string;
        severity?: string;
        variant?: string;
        class?: string;
      }>
    >,
    default: () => [],
  },
});
</script>

<template>
  <article
    class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 border border-surface-200 dark:border-surface-700 rounded-2xl flex flex-col gap-6 relative overflow-hidden group glow-border shadow-sm transition-all duration-300"
  >
    <div
      class="absolute w-32 h-32 blur-2xl transition-opacity duration-300"
      :class="[
        glowColorClass,
        glowPosition === 'top-right'
          ? 'top-0 right-0 rounded-bl-full'
          : 'bottom-0 left-0 rounded-tr-full',
      ]"
      aria-hidden="true"
    ></div>

    <i
      :class="[
        'pi',
        icon,
        'text-3xl text-surface-900 dark:text-surface-0 mb-2',
      ]"
      aria-hidden="true"
    ></i>

    <header>
      <h3
        class="text-3xl font-semibold text-surface-900 dark:text-surface-0 mb-4 tracking-tight"
      >
        {{ title }}
      </h3>
      <p
        class="text-base text-surface-600 dark:text-surface-400 leading-relaxed"
      >
        {{ description }}
      </p>
    </header>

    <footer class="mt-auto pt-6 flex flex-wrap gap-3">
      <Tag
        v-for="(tag, index) in tags"
        :key="index"
        :value="tag.label"
        :severity="tag.severity || 'secondary'"
        :variant="tag.variant || 'outlined'"
        class="uppercase tracking-wider text-[10px]"
      />
    </footer>
  </article>
</template>

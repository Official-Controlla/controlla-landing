<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: computed(() => `${t('nav.about')} | Controlla`),
  description: computed(() => t('seo.description'))
});
</script>

<template>
  <main class="flex flex-col flex-1">
    <section class="relative pt-32 pb-32 bg-surface-50 dark:bg-surface-950 overflow-hidden tech-grid min-h-[60vh] flex items-center">
      <div class="default-container relative z-10 flex flex-col items-center text-center">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-surface-900 dark:text-surface-0">
          {{ $t('nav.about') }}
        </h1>
        <p class="text-xl md:text-2xl text-surface-600 dark:text-surface-300 max-w-3xl leading-relaxed">
          {{ $t('approach.p1') }}
        </p>
      </div>
    </section>
  </main>
</template>

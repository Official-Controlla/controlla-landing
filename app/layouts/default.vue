<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950 font-sans text-surface-900 dark:text-surface-0 selection:bg-primary-200 dark:selection:bg-primary-800">
    <AppHeader />
    
    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

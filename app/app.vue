<template>
  <div class="min-h-screen antialiased">
    <ConfirmDialog />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html,
body {
  scroll-behavior: smooth;
  font-family: "Inter", sans-serif;
  touch-action: manipulation;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(10px);
}

/* Barra superior (scrollbar) personalización para colores */
::-webkit-scrollbar {
  height: 12px;
  width: 12px;
  background: #f5f5f5; /* fondo negro */
}
::-webkit-scrollbar-thumb {
  background: var(--p-primary-color); /* primary */
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--p-primary-color-hover); /* primary */
}
/* Firefox */
* {
  scrollbar-color: var(--p-primary-color) var(--p-surface-0);
  scrollbar-width: thin;
}
</style>

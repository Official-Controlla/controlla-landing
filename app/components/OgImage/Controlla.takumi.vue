<script setup lang="ts">
const { title = "Engineered Intelligence", description = "" } = defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div
    class="h-full w-full flex flex-col justify-between bg-[#09090b] text-white p-16 border-l-24 border-solid border-[#2563eb]"
  >
    <div class="flex flex-col mt-4">
      <div class="flex items-center mb-10">
        <img src="/logo.png" alt="Controlla Logo" class="h-12 w-auto mr-4" />
      </div>

      <h1 class="text-4xl font-black leading-tight text-white max-w-4xl">
        {{ title }}
      </h1>

      <p
        v-if="description"
        class="text-3xl text-[#a1a1aa] mt-2 max-w-5xl leading-relaxed"
      >
        {{ description }}
      </p>
    </div>

    <div
      class="flex items-center justify-between mt-auto pt-4 border-t-2 border-solid border-[#27272a]"
    >
      <div class="text-3xl font-semibold text-[#d4d4d8]">controlla.com.mx</div>
      <div class="text-2xl font-bold text-[#60a5fa]">
        Nearshore Software & AI
      </div>
    </div>
  </div>
</template>

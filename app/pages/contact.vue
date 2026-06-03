<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const { t } = useI18n();
const config = useRuntimeConfig();

useSeoMeta({
  title: computed(() => t("contactPage.seo.title")),
  description: computed(() => t("contactPage.seo.description")),
  keywords: computed(() => t("contactPage.seo.keywords")),
});

defineOgImage("Controlla.takumi", {
  title: computed(() => t("contactPage.seo.title")),
  description: computed(() => t("contactPage.seo.description")),
});

useSchemaOrg([
  defineLocalBusiness({
    "@type": "ProfessionalService",
    name: computed(() => t("seo.orgName")),
    email: "ltorres@controlla.com.mx",
    address: {
      addressLocality: "Chihuahua",
      addressRegion: "CHH",
      addressCountry: "MX",
    },
    geo: {
      latitude: 28.6625774,
      longitude: -106.1260559,
    },
  }),
  defineWebPage(),
]);

const mapContainer = ref<HTMLElement | null>(null);
let map: maplibregl.Map | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  map = new maplibregl.Map({
    container: mapContainer.value,
    style:
      "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
    center: [-106.1260559, 28.6625774],
    zoom: 4,
    interactive: false,
    attributionControl: false,
  });

  new maplibregl.Marker({ color: "#2563EB" })
    .setLngLat([-106.1260559, 28.6625774])
    .addTo(map);
  map.on("load", () => {
    map?.resize();
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});

const formData = ref({
  fullName: "",
  email: "",
  projectType: "",
  message: "",
});

const isSubmitting = ref(false);
const formStatus = ref<"idle" | "success" | "error">("idle");

const submitForm = async () => {
  isSubmitting.value = true;
  formStatus.value = "idle";

  try {
    const response = await $fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        access_key: config.public.web3formsApiKey,
        subject: `New Project Inquiry from ${formData.value.fullName}`,
        from_name: formData.value.fullName,
        email: formData.value.email,
        project_type: formData.value.projectType,
        message: formData.value.message,
      },
    });

    if (response) {
      formStatus.value = "success";
      formData.value = {
        fullName: "",
        email: "",
        projectType: "",
        message: "",
      };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    formStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <main class="flex flex-col flex-1">
    <!-- Header Section -->
    <section
      class="relative pt-32 pb-16 bg-surface-50 dark:bg-surface-950 overflow-hidden tech-grid flex items-center"
    >
      <div
        class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center"
      >
        <div
          class="inline-flex items-center gap-2 bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-full px-4 py-1.5 mb-8 shadow-sm"
        >
          <span
            class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"
          ></span>
          <span
            class="text-[11px] text-surface-500 dark:text-surface-400 uppercase tracking-wider font-semibold"
            >{{ $t("contactPage.badge") }}</span
          >
        </div>
        <h1
          class="text-4xl md:text-[80px] font-bold tracking-tight mb-6 text-surface-900 dark:text-surface-0 leading-tight"
        >
          {{ $t("contactPage.title") }}
        </h1>
        <p
          class="text-xl md:text-2xl text-surface-600 dark:text-surface-300 max-w-3xl leading-relaxed"
        >
          {{ $t("contactPage.subtitle") }}
        </p>
      </div>
    </section>

    <!-- Main Content Layout -->
    <section
      class="py-16 bg-surface-50 dark:bg-surface-950 relative z-10 mb-16"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Contact Info Panel -->
          <div
            class="lg:col-span-5 bg-surface-0 dark:bg-surface-900 p-8 md:p-12 border border-surface-200 dark:border-surface-800 rounded-2xl flex flex-col gap-8 relative overflow-hidden shadow-sm"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-bl-full blur-2xl pointer-events-none"
            ></div>

            <h2
              class="text-2xl font-bold text-surface-900 dark:text-surface-0 tracking-tight"
            >
              {{ $t("contactPage.globalPresence") }}
            </h2>

            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-surface-100 dark:bg-surface-800 rounded-lg flex items-center justify-center text-primary-500 border border-surface-200 dark:border-surface-700 flex-shrink-0"
              >
                <i class="pi pi-map-marker text-xl"></i>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-surface-900 dark:text-surface-0 mb-1"
                >
                  {{ $t("contactPage.hq") }}
                </h3>
                <p class="text-surface-600 dark:text-surface-300">
                  {{ $t("contactPage.hqDesc1") }}
                </p>
                <p
                  class="text-surface-500 dark:text-surface-400 text-sm mt-2 leading-relaxed"
                >
                  {{ $t("contactPage.hqDesc2") }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-surface-100 dark:bg-surface-800 rounded-lg flex items-center justify-center text-primary-500 border border-surface-200 dark:border-surface-700 flex-shrink-0"
              >
                <i class="pi pi-envelope text-xl"></i>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-surface-900 dark:text-surface-0 mb-1"
                >
                  {{ $t("contactPage.directComm") }}
                </h3>
                <a
                  href="mailto:ltorres@controlla.com.mx"
                  class="text-surface-900 dark:text-surface-0 hover:text-primary-500 transition-colors duration-200"
                  >{{ $t("contactPage.email") }}</a
                >
                <p
                  class="text-surface-500 dark:text-surface-400 text-sm mt-2 leading-relaxed"
                >
                  {{ $t("contactPage.emailDesc") }}
                </p>
              </div>
            </div>

            <!-- MapLibre GL Location -->
            <a
              href="https://www.google.com/maps/place/Controlla/@28.6625774,-106.1260559,17z/data=!4m14!1m7!3m6!1s0x86ea5d8b01f5f59d:0xaef81172093e1abf!2sControlla!8m2!3d28.6625774!4d-106.1260559!16s%2Fg%2F11flmvjth2!3m5!1s0x86ea5d8b01f5f59d:0xaef81172093e1abf!8m2!3d28.6625774!4d-106.1260559!16s%2Fg%2F11flmvjth2?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto relative h-64 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700 block group cursor-pointer"
            >
              <div
                ref="mapContainer"
                class="absolute inset-0 pointer-events-none"
              ></div>
              <div
                class="absolute inset-0 bg-surface-900/0 group-hover:bg-surface-900/10 dark:group-hover:bg-surface-0/10 transition-colors duration-300 z-10 flex items-center justify-center"
              >
                <div
                  class="opacity-0 group-hover:opacity-100 bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform scale-95 group-hover:scale-100 flex items-center gap-2"
                >
                  <span>Google Maps</span>
                  <i class="pi pi-external-link text-xs"></i>
                </div>
              </div>
            </a>
          </div>

          <!-- Contact Form Panel -->
          <div
            class="lg:col-span-7 bg-surface-0 dark:bg-surface-900 p-8 md:p-12 border border-surface-200 dark:border-surface-800 rounded-2xl flex flex-col gap-6 relative overflow-hidden shadow-sm"
          >
            <div
              class="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/10 rounded-tr-full blur-2xl pointer-events-none"
            ></div>

            <div class="relative z-10 mb-2">
              <h2
                class="text-3xl font-bold text-surface-900 dark:text-surface-0 tracking-tight mb-2"
              >
                {{ $t("contactPage.formTitle") }}
              </h2>
              <p class="text-surface-600 dark:text-surface-400">
                {{ $t("contactPage.formDesc") }}
              </p>
            </div>

            <form
              @submit.prevent="submitForm"
              class="space-y-6 relative z-10 flex flex-col h-full"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label
                    for="fullName"
                    class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
                    >{{ $t("contactPage.fullName") }}</label
                  >
                  <InputText
                    id="fullName"
                    v-model="formData.fullName"
                    :placeholder="$t('contactPage.fullNamePlaceholder')"
                    required
                    class="w-full"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label
                    for="email"
                    class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
                    >{{ $t("contactPage.emailLabel") }}</label
                  >
                  <InputText
                    id="email"
                    type="email"
                    v-model="formData.email"
                    :placeholder="$t('contactPage.emailPlaceholder')"
                    required
                    class="w-full"
                  />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label
                  for="projectType"
                  class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
                  >{{ $t("contactPage.projectType") }}</label
                >
                <select
                  id="projectType"
                  v-model="formData.projectType"
                  required
                  class="p-inputtext w-full appearance-none bg-surface-0 dark:bg-surface-950 border border-surface-300 dark:border-surface-700 text-surface-900 dark:text-surface-0 rounded-md"
                >
                  <option value="" disabled>
                    {{ $t("contactPage.projectTypePlaceholder") }}
                  </option>
                  <option value="AI Integration">
                    {{ $t("contactPage.typeOptions.ai") }}
                  </option>
                  <option value="Data Engineering">
                    {{ $t("contactPage.typeOptions.data") }}
                  </option>
                  <option value="Custom Software">
                    {{ $t("contactPage.typeOptions.custom") }}
                  </option>
                  <option value="Consulting">
                    {{ $t("contactPage.typeOptions.consulting") }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-2 flex-grow">
                <label
                  for="message"
                  class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-widest font-semibold"
                  >{{ $t("contactPage.message") }}</label
                >
                <Textarea
                  id="message"
                  v-model="formData.message"
                  :placeholder="$t('contactPage.messagePlaceholder')"
                  required
                  class="w-full min-h-[150px] resize-none"
                />
              </div>

              <Message
                v-if="formStatus === 'success'"
                severity="success"
                :closable="false"
                class="mt-4"
                >{{ $t("contactPage.success") }}</Message
              >
              <Message
                v-if="formStatus === 'error'"
                severity="error"
                :closable="false"
                class="mt-4"
                >{{ $t("contactPage.error") }}</Message
              >

              <div class="pt-4 flex justify-end mt-auto">
                <Button
                  type="submit"
                  :label="
                    isSubmitting
                      ? $t('contactPage.submitting')
                      : $t('contactPage.submit')
                  "
                  :icon="
                    isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'
                  "
                  iconPos="right"
                  :disabled="isSubmitting"
                  class="px-8 py-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
:deep(.maplibregl-canvas-container),
:deep(.maplibregl-canvas) {
  width: 100% !important;
  height: 100% !important;
}
:deep(.maplibregl-map) {
  font-family: inherit;
  width: 100% !important;
  height: 100% !important;
}
</style>

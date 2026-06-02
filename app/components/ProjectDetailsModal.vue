<script setup lang="ts">
const visible = defineModel<boolean>("visible", { default: false });

defineProps({
  project: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    class="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-4"
    contentClass="bg-surface-0 dark:bg-surface-900 rounded-b-2xl p-0"
    headerClass="bg-surface-50 dark:bg-surface-950 rounded-t-2xl border-b border-surface-200 dark:border-surface-800"
  >
    <template #header>
      <div v-if="project" class="flex flex-col">
        <span
          class="text-sm font-semibold uppercase tracking-wider text-surface-500"
          >{{ project.client }}</span
        >
        <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{
          project.title
        }}</span>
      </div>
    </template>

    <div v-if="project" class="flex flex-col pb-8">
      <!-- Hero Image -->
      <figure class="w-full h-64 sm:h-80 relative overflow-hidden mb-8 m-0">
        <img
          :src="project.coverImage"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-surface-0 dark:from-surface-900 via-transparent to-transparent"
          aria-hidden="true"
        ></div>
      </figure>

      <div class="px-6 sm:px-10 flex flex-col gap-10">
        <!-- The Challenge -->
        <section aria-labelledby="challenge-heading">
          <header>
            <h3
              id="challenge-heading"
              class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2"
            >
              <i
                class="pi pi-exclamation-triangle text-orange-500"
                aria-hidden="true"
              ></i>
              {{ $t("caseStudies.modal.challenge") }}
            </h3>
          </header>
          <p
            class="text-lg text-surface-600 dark:text-surface-400 leading-relaxed"
          >
            {{ project.details.problemSolved }}
          </p>
        </section>

        <!-- The Solution -->
        <section aria-labelledby="solution-heading">
          <header>
            <h3
              id="solution-heading"
              class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2"
            >
              <i
                class="pi pi-check-circle text-green-500"
                aria-hidden="true"
              ></i>
              {{ $t("caseStudies.modal.solution") }}
            </h3>
          </header>
          <p
            class="text-lg text-surface-600 dark:text-surface-400 leading-relaxed"
          >
            {{ project.details.whatWeDid }}
          </p>
        </section>

        <hr
          class="border-surface-200 dark:border-surface-800"
          aria-hidden="true"
        />

        <!-- Mockups Gallery -->
        <section
          v-if="project.details.gallery && project.details.gallery.length"
          aria-labelledby="gallery-heading"
        >
          <header>
            <h3
              id="gallery-heading"
              class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-6 flex items-center gap-2"
            >
              <i class="pi pi-images text-primary-500" aria-hidden="true"></i>
              {{ $t("caseStudies.modal.gallery") || "Platform Mockups" }}
            </h3>
          </header>

          <Carousel
            :value="project.details.gallery"
            :numVisible="1"
            :numScroll="1"
            :circular="true"
            :autoplayInterval="4000"
            class="custom-gallery-carousel"
          >
            <template #item="slotProps">
              <div class="p-2 w-full flex justify-center">
                <Image
                  :src="slotProps.data"
                  :alt="`${project.title} mockup`"
                  imageClass="rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 max-h-[600px] object-contain w-auto mx-auto"
                  preview
                />
              </div>
            </template>
          </Carousel>
        </section>

        <!-- Specs (Tech & Integrations) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section
            v-if="project.details.techStack.length"
            aria-labelledby="tech-heading"
          >
            <h4
              id="tech-heading"
              class="font-bold text-xs uppercase tracking-widest mb-4 text-surface-500"
            >
              {{ $t("caseStudies.modal.techStack") }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <Chip
                v-for="tech in project.details.techStack"
                :key="tech"
                :label="tech"
                class="text-xs bg-surface-100 dark:bg-surface-800"
              />
            </div>
          </section>

          <section
            v-if="project.details.integrations.length"
            aria-labelledby="integrations-heading"
          >
            <h4
              id="integrations-heading"
              class="font-bold text-xs uppercase tracking-widest mb-4 text-surface-500"
            >
              {{ $t("caseStudies.modal.integrations") }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <Chip
                v-for="int in project.details.integrations"
                :key="int"
                :label="int"
                variant="outlined"
                class="text-xs"
              />
            </div>
          </section>
        </div>

        <!-- Links (Stores / Web) -->
        <nav
          v-if="
            project.details.links.website ||
            project.details.links.appStore ||
            project.details.links.playStore
          "
          aria-label="Project Links"
          class="flex flex-wrap gap-4 mt-2"
        >
          <Button
            v-if="project.details.links.website"
            as="a"
            :href="project.details.links.website"
            target="_blank"
            :label="$t('caseStudies.modal.visitWeb')"
            icon="pi pi-external-link"
            size="small"
          />
          <Button
            v-if="project.details.links.appStore"
            as="a"
            :href="project.details.links.appStore"
            target="_blank"
            :label="$t('caseStudies.modal.appStore')"
            icon="pi pi-apple"
            severity="secondary"
            variant="outlined"
            size="small"
          />
          <Button
            v-if="project.details.links.playStore"
            as="a"
            :href="project.details.links.playStore"
            target="_blank"
            :label="$t('caseStudies.modal.playStore')"
            icon="pi pi-android"
            severity="secondary"
            variant="outlined"
            size="small"
          />
        </nav>
      </div>
    </div>
  </Dialog>
</template>

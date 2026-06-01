import LocomotiveScroll from "locomotive-scroll";
import type { Router } from "vue-router";
import { nextTick } from "vue";

type ScrollOptions = ConstructorParameters<typeof LocomotiveScroll>[0];

export default defineNuxtPlugin((nuxtApp) => {
  const instance = shallowRef<LocomotiveScroll | null>(null);
  const onResize = () => {
    instance.value?.resize();
  };

  const destroy = () => {
    if (!instance.value) return;
    instance.value.destroy();
    instance.value = null;
  };

  /**
   * SPA: la instancia anterior queda ligada al DOM que Vue ya desmontó.
   * Si init() reutiliza esa instancia, Locomotive deja de funcionar tras el primer cambio de ruta.
   */
  const init = (options?: ScrollOptions) => {
    if (import.meta.server) return null;
    if (instance.value) {
      destroy();
    }
    instance.value = new LocomotiveScroll(options);
    return instance.value;
  };

  const resize = () => {
    if (!instance.value) return;
    instance.value.resize();
  };

  const start = () => {
    instance.value?.start();
  };

  const stop = () => {
    instance.value?.stop();
  };

  const scrollTo = (
    target: Parameters<LocomotiveScroll["scrollTo"]>[0],
    options?: Parameters<LocomotiveScroll["scrollTo"]>[1]
  ) => {
    instance.value?.scrollTo(target, options);
  };

  nuxtApp.hook("app:mounted", () => {
    window.addEventListener("resize", onResize, { passive: true });
    (nuxtApp.$router as Router).beforeEach(() => {
      destroy();
    });
  });

  nuxtApp.hook("page:finish", () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        instance.value?.resize();
      });
    });
  });

  return {
    provide: {
      locomotive: {
        instance,
        init,
        destroy,
        resize,
        start,
        stop,
        scrollTo,
      },
    },
  };
});

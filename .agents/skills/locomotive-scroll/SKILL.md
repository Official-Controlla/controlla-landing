---
name: locomotive-scroll
description: Skill actualizado para Locomotive Scroll v5 (basado en Lenis). Úsalo para integrar smooth scroll, parallax con data-attributes, scroll programático y configuración client-only en entornos SSR como Nuxt.
---

# Locomotive Scroll v5

Guía práctica para usar Locomotive Scroll v5 correctamente.

## Qué cambió en v5 (importante)

- Está construido sobre **Lenis**.
- Ya no uses patrones de v4 como:
  - `el`, `smooth`, `tablet`, `smartphone`, `scroll.on(...)`.
- La configuración principal ahora vive en `lenisOptions`.
- Los triggers/efectos se controlan sobre todo con `data-scroll-*`.

## Regla clave para SSR (Nuxt/Next/SvelteKit)

Locomotive Scroll depende de `window` + `IntersectionObserver`.
Siempre inicializa **solo en cliente**.

- En Nuxt usar plugin `*.client.ts`.
- Nunca crear instancia en server.
- Destruir instancia al desmontar app/ruta.

## Instalación

```bash
npm install locomotive-scroll
```

```ts
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
```

## Inicialización v5 correcta

### Full-page (window) - default

```ts
const scroll = new LocomotiveScroll({
  lenisOptions: {
    // valores Lenis
    lerp: 0.1,
    smoothWheel: true,
    smoothTouch: false,
  },
  autoStart: true,
});
```

### Contenedor custom

```ts
const wrapper = document.querySelector(".scroll-container") as HTMLElement;
const content = document.querySelector(".scroll-content") as HTMLElement;

const scroll = new LocomotiveScroll({
  lenisOptions: {
    wrapper,
    content,
    orientation: "vertical",
  },
});
```

## Opciones soportadas (v5)

- `lenisOptions` (wrapper, content, lerp, duration, orientation, gestureOrientation, smoothWheel, smoothTouch, wheelMultiplier, touchMultiplier, normalizeWheel, easing, prevent, etc.)
- `triggerRootMargin` (IO para triggers)
- `rafRootMargin` (IO para elementos animados por RAF)
- `autoStart`
- `scrollCallback`
- `initCustomTicker`
- `destroyCustomTicker`

## Métodos soportados (v5)

- `destroy()`
- `start()`
- `stop()`
- `resize()`
- `addScrollElements(container)`
- `removeScrollElements(container)`
- `scrollTo(target, options)`

## Atributos recomendados (v5)

- `data-scroll`
- `data-scroll-position`
- `data-scroll-offset`
- `data-scroll-class`
- `data-scroll-repeat`
- `data-scroll-speed`
- `data-scroll-call`
- `data-scroll-css-progress`
- `data-scroll-event-progress`
- `data-scroll-enable-touch-speed` (si quieres parallax también en touch)

## Eventos en v5 (enfocados a DOM events)

Ejemplo con `data-scroll-call`:

```html
<div data-scroll data-scroll-call="heroEnter"></div>
```

```ts
window.addEventListener("heroEnter", (e) => {
  console.log("Call event", (e as CustomEvent).detail);
});
```

Ejemplo con `data-scroll-event-progress`:

```html
<div data-scroll data-scroll-event-progress="heroProgress"></div>
```

```ts
window.addEventListener("heroProgress", (e) => {
  console.log("Progress", (e as CustomEvent).detail.progress);
});
```

## Patrón Nuxt recomendado

- Plugin `app/plugins/locomotive.client.ts`.
- Exponer utilidades (`init`, `destroy`, `resize`, `start`, `stop`, `scrollTo`).
- Registrar/remover `resize` listener en hooks de app.
- Llamar `destroy()` en cleanup.

## Errores comunes a evitar

1. Usar opciones antiguas:
   - `smoothTouch` en raíz (incorrecto)  
   - correcto: `lenisOptions: { smoothTouch: false }`.
2. Usar `el` (v4) en vez de `lenisOptions.wrapper/content` (v5).
3. Crear instancia en SSR.
4. No destruir instancia en cambios de ciclo de vida.

## Performance y accesibilidad

- Respeta `prefers-reduced-motion` para desactivar suavizado.
- No abuses de elementos con `data-scroll-speed`.
- Usa `resize()` tras cambios fuertes de layout dinámico.
- Para popups de terceros con scroll interno, usar `lenisOptions.prevent`.

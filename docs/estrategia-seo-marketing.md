# Estrategia SEO — CANO STEEL (guía para marketing)

Este documento explica **qué estamos haciendo en SEO** en el sitio web, en lenguaje claro y orientado a equipos de marketing, ventas y comunicación. No requiere conocimientos técnicos.

---

## 1. Objetivo de la estrategia

Queremos que Google y otros buscadores **entiendan bien** qué ofrece CANO STEEL, que las páginas se **indexen correctamente** y que, cuando alguien comparta un enlace (LinkedIn, WhatsApp, correo), la **vista previa** (título, texto e imagen) sea profesional y coherente con la marca.

La estrategia combina tres pilares:

| Pilar | Qué significa en la práctica |
|--------|-----------------------------|
| **SEO técnico** | El sitio “habla el idioma” de los buscadores: mapa del sitio, instrucciones para rastreadores, URL canónica, datos estructurados. |
| **SEO on-page** | Cada página importante tiene título, descripción y contenido alineados con lo que busca el usuario y con el negocio. |
| **SEO de marca y difusión (social / enlaces)** | Imagen y mensaje consistentes al compartir; con el tiempo, autoridad con buenos enlaces y contenido útil. |

> **Importante:** El SEO es un trabajo continuo. Lo técnico y on-page **abre la puerta** a que Google te rastree y muestre resultados coherentes; **las posiciones** dependen también de competencia, contenido, reputación y actualizaciones.

---

## 2. Qué tenemos implementado en el sitio (resumen)

### 2.1 Título y descripción (resultados de búsqueda)

- Cada página puede definir un **título** y una **meta descripción**: el texto que suele verse en Google debajo del título azul.
- En la **página de inicio** ya hay textos definidos orientados a “acero estructural”, servicios y alcance en EE. UU.

**Rol de marketing:** revisar cada cierto tiempo si el título y la descripción siguen siendo los mensajes que quieren transmitir (oferta, diferencial, llamada implícita).

### 2.2 URL canónica

- La **URL canónica** dice a Google: “esta es la versión oficial de esta página”.
- Evita confusiones si en el futuro hubiera parámetros en la URL o variaciones.

**Rol de marketing:** casi no tienen que hacer nada; solo asegurarse de que el **dominio público** del sitio (por ejemplo el que está en Netlify) esté bien configurado en el entorno de despliegue (ver sección 5).

### 2.3 Open Graph y Twitter (compartir en redes)

- Cuando alguien pega el enlace en redes o herramientas de mensajería, suelen mostrarse **título, descripción e imagen**.
- Usamos una imagen pensada para eso: **`/og_image.png`** (imagen de marca / hero gráfico), más adecuada para redes que un recorte aleatorio de la web.

**Rol de marketing:** si cambian la línea gráfica o el mensaje principal, pueden pedir actualizar título/descripción de la home y, si hace falta, sustituir `og_image.png` por una nueva pieza del mismo formato (idealmente horizontal, buena legibilidad en móvil).

### 2.4 Datos estructurados (Schema.org)

- Son “etiquetas invisibles” que ayudan a Google a entender **quién es la organización** y **qué sitio** es.
- En la inicio incluimos marcas básicas tipo **Organization** y **WebSite**.

**Rol de marketing:** refuerzan marca y contexto; no sustituyen una ficha de Google Business ni las reseñas. Si en el futuro quieren enriquecer (por ejemplo datos de contacto públicos muy visibles), se puede ampliar con el equipo técnico.

### 2.5 Sitemap XML (`/sitemap.xml`)

- Es una **lista de URLs** del sitio que facilita a Google descubrir páginas.
- Se genera de forma automática con el proyecto.

**Rol de marketing:** después de lanzar páginas nuevas importantes, en **Google Search Console** pueden comprobar que el sitemap está enviado y cuántas URLs se han descubierto.

### 2.6 Archivo `robots` (`/robots.txt`)

- Indica a los rastreadores qué pueden indexar y, en nuestro caso, **dónde está el sitemap**.
- También lo gestiona el sistema de forma integrada con el módulo de robots del proyecto.

**Rol de marketing:** normalmente no hace falta tocarlo salvo una decisión estratégica (por ejemplo, no indexar una sección temporal).

---

## 3. Enfoque de contenido (lo que marketing controla mejor)

Para reforzar el SEO **sin depender solo del código**:

1. **Una intención clara por página**  
   Cada URL debería responder a una pregunta: “¿Diseño?” “¿Servicios?” “¿Proyectos?” “¿Contacto?”

2. **Títulos y subtítulos descriptivos**  
   Usar palabras que el cliente realmente busca (acero estructural, fabricación, instalación, joists, decking, certificaciones, etc.) sin relleno.

3. **Texto útil y específico**  
   Google premia contenido que resuelve dudas: procesos, normas, tipos de proyecto, geografías, diferenciales.

4. **Imágenes con sentido**  
   Nombres y textos alternativos (cuando la plantilla lo permita) que describan la imagen y el contexto, no “IMG_001”.

5. **Enlaces internos**  
   Desde la home y servicios, enlazar bien a contacto, proyectos y páginas clave.

---

## 4. Qué medir (KPIs sencillos)

| Métrica | Dónde | Para qué sirve |
|---------|--------|----------------|
| **Impresiones y clics** (búsqueda) | Google Search Console | Saber si Google está mostrando el sitio y si la gente hace clic. |
| **Cobertura / indexación** | Search Console | Ver si hay páginas con errores o no indexadas. |
| **Posición media** (consultas) | Search Console | Evolución por tema (no obsesionarse con una sola keyword). |
| **Tráfico orgánico** | Analytics (si lo tienen) | Visitas desde buscadores. |
| **Vista previa al compartir** | LinkedIn / Slack / WhatsApp | Comprobar título, texto e imagen OG. |

---

## 5. Acción necesaria en despliegue (Netlify)

Para que la **URL canónica**, Open Graph y datos estructurados usen el **dominio real** (y no un placeholder), en Netlify debe existir la variable de entorno:

- **`NUXT_PUBLIC_SITE_URL`** = `https://www.tu-dominio.com` (o el dominio definitivo, **con https y sin barra final** o con barra final de forma consistente).

Sin esto, los metadatos pueden apuntar a una URL base incorrecta y las vistas previas sociales pueden fallar o verse mal.

---

## 6. Roadmap sugerido (marketing + técnico)

1. **Corto plazo:** Confirmar dominio final y variable `NUXT_PUBLIC_SITE_URL`; dar de alta el sitio en **Google Search Console** y enviar `sitemap.xml`.
2. **Medio plazo:** Revisar títulos y descripciones de **todas** las páginas principales (servicios, sobre nosotros, productos, contacto) con mensajes alineados a campañas.
3. **Largo plazo:** Blog o notas técnicas (si encaja en la estrategia), casos de estudio, y enlaces de calidad desde partners y medios del sector.

---

## 7. Glosario rápido

- **Indexar:** que Google guarde la página en su índice para poder mostrarla en resultados.
- **Rastrear (crawl):** cuando el robot de Google visita las URLs.
- **Sitemap:** lista de URLs recomendadas para rastrear.
- **Canonical:** “esta es la URL oficial de este contenido”.
- **Open Graph:** metadatos para compartir en redes (título, descripción, imagen).
- **Schema / datos estructurados:** información organizada para máquinas sobre negocio, productos, etc.

---

## 8. Contacto con el equipo técnico

Si marketing necesita:

- cambiar mensajes SEO de una página concreta,
- una nueva imagen OG,
- o ampliar datos estructurados (eventos, FAQ solo si aplica políticas actuales de Google, etc.),

pueden pedirlo como **ticket** con: URL, texto propuesto título/descripción, y objetivo de la página (qué quieren que haga el usuario después de leer).

---

*Documento alineado con la implementación técnica del proyecto (Nuxt, módulos de sitemap/robots, metadatos y schema en home). Actualizar este .md cuando cambie la estrategia de mensaje o el dominio de producción.*

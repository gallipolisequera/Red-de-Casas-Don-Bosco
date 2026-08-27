# Informe del Sitio Web "Casas Don Bosco"

## 1. De qué trata el proyecto
Es un sitio web institucional que hoy muestra la sección "¿Qué es?". Se construyó con **Astro**, una herramienta que crea páginas web rápidas y livianas. Los estilos están hechos a mano (sin programas externos) y la interacción usa JavaScript sencillo, sin librerías.

## 2. Cómo está organizado
- **La plantilla común** (`Rojo.astro`): contiene lo que se repite en todas las páginas — logo, menú lateral, carrusel, pie de página y fondos.
- **La página de contenido** (`index.astro`): tiene el menú superior y el texto de presentación, que se colocan dentro de un espacio reservado en la plantilla.
- **Carpeta de imágenes** (`public/`): guarda los dibujos, fotos y letras usadas por el sitio.
- Ventaja: para agregar otra sección (ej. "Historia") solo hace falta crear una página nueva que use la misma plantilla.

## 3. El "stage": cómo se ve bien en cualquier pantalla
El diseño se hizo como un **lienzo fijo de 1400×650 px** (ancho × alto), parecido a un cartel. La meta es que se vea **igual en cualquier pantalla**: como una foto que se agranda o encoge sin deformarse. Se logra con tres ideas:

1. **La caja no se deforma**: el lienzo siempre mantiene su proporción, sin importar el tamaño de la pantalla.
2. **Cuadrícula invisible de 56 columnas y 26 filas**: cada elemento (logo, menú, carrusel, texto) indica qué espacio de esa cuadrícula ocupa, por ejemplo "de la columna 15 a la 41, de la fila 10 a la 16". Así todo queda colocado con precisión, igual que en el diseño original.
3. **Medidas proporcionales**: los tamaños de letra y los espacios no se fijan en números rígidos, sino en porcentajes del lienzo. Si el lienzo crece, todo crece en la misma proporción.

Resultado: **no hay versiones distintas** para celular, tableta o computadora; el mismo diseño se escala y siempre se ve igual.

## 4. Las imágenes del sitio (SVG)
El logo, los iconos del menú, las flechas, los fondos y las redes sociales son **SVG**: imágenes dibujadas con formas geométricas en vez de puntitos de color. Por eso:
- Se ven **nítidas a cualquier tamaño** (no se ven borrosas al agrandarlas).
- **Pesan muy poco** y cargan rápido.
- Se pueden animar con CSS (por ejemplo, que crezcan al pasar el cursor).
- Las únicas fotos "reales" son las del carrusel, en un formato comprimido llamado WebP, ideal para la web.

## 5. El carrusel (galería que sube y baja)
Son dos "ventanas" de fotos, una sobre otra, con flechas para navegar. Por dentro:
- Se arma una **tira vertical con las fotos repetidas tres veces** (si hay 2 fotos, la tira tiene 6). Así siempre quedan copias esperando arriba y abajo, y el carrusel parece infinito.
- Al hacer clic en una flecha, la tira se **desliza suavemente** hacia arriba o abajo.
- Cuando se llega al final, el sitio **salta a una copia idéntica** que está en el centro, tan rápido que el ojo no lo nota. Por eso se puede navegar todo el tiempo sin ver nunca el final de la tira.

## 6. Botones activos e inactivos
- **Menú superior**: cada opción es un botón de texto. La sección donde está el usuario se marca con **fondo rojo y letra blanca** (botón activo), y las demás quedan en **gris** (inactivas). Así siempre se sabe dónde está uno.
- **Reacción al cursor**: al pasar el mouse por cualquier opción, esta **crece un poquito** con un movimiento suave. Eso da sensación de que el botón "responde".
- **Menú lateral**: seis botones con dibujos que por ahora solo reaccionan al cursor (aún no marcan activo/inactivo).

## 7. Letras y colores
- La letra es **Open Sans**, moderna y legible, guardada dentro del propio sitio en un formato comprimido que carga rápido. Se usa en 5 grosores (normal, mediana, seminegra, negra y extranegra).
- Colores institucionales: **rojo** (el principal), **blanco** y **gris oscuro** para los textos.

## 8. El JavaScript (la interacción)
Se usa JavaScript sencillo, sin programas externos, en unas 70 líneas. Hace tres cosas:
- Encuentra los elementos de la página (carrusel, flechas).
- Escucha los clics del usuario.
- Crea la tira de fotos y la mueve.
- El resto del movimiento (transiciones y crecimiento al pasar el cursor) lo hace el propio CSS, que es más simple y liviano.

## 9. El sitio terminado
Con un solo comando, el proyecto se **comprime en archivos finales** (HTML, CSS y JavaScript) listos para subir a internet. El sitio resultante no necesita servidores especiales ni bases de datos: solo un alojamiento web común. Por eso es **rápido, seguro y barato de mantener**.

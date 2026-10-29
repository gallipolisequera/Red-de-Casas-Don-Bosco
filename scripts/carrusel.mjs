import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIR = join(ROOT, "public", "carrusel");
const OUT_DIR = join(ROOT, "src", "data");
const OUT_FILE = join(OUT_DIR, "carrusel.ts");

const imagenes = readdirSync(DIR)
	.map((nombre) => ({ nombre, m: nombre.match(/^r_img(\d+)\.webp$/i) }))
	.filter((item) => item.m)
	.sort((a, b) => Number(a.m[1]) - Number(b.m[1]));

if (imagenes.length === 0) {
	console.error(`No se encontraron imágenes en ${DIR}`);
	process.exit(1);
}

const lista = imagenes
	.map(({ nombre }) => `\t"/carrusel/${nombre}",`)
	.join("\n");

const contenido = `// Generado por scripts/carrusel.mjs (npm run carrusel). No editar a mano.
export const imagenesCarrusel = [
${lista}
];
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, contenido, "utf8");

console.log(`Listo. ${imagenes.length} imagen(es) escritas en src/data/carrusel.ts`);

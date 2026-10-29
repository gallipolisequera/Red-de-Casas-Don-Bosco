import { readdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const SRC_DIR = join(
	process.env.USERPROFILE ?? "",
	"Downloads",
	"FOTOSS",
	"FOTOSS",
);
const OUT_DIR = join(ROOT, "public", "carrusel");

// Archivos sin número: ocupan los huecos de la secuencia 01..64
// y el último lugar, reconstruyendo el orden 1..65.
const ESPECIALES = {
	15: "FOTOS_ENCUENTRO.webp",
	46: "FOTOS_PUERTO LA CRUZ.webp",
	65: "FOTOS_VALENCIAO.webp",
};

// Las 23 fotos actuales ocupan r_img1..r_img23
const DESPLAZAMIENTO = 23;
const TOTAL = 65;

if (!existsSync(SRC_DIR)) {
	console.error(`No existe la carpeta: ${SRC_DIR}`);
	process.exit(1);
}

const archivos = readdirSync(SRC_DIR);

const porNumero = new Map();
for (const nombre of archivos) {
	const m = nombre.match(/-(\d+)\.webp$/i);
	if (m) porNumero.set(Number(m[1]), nombre);
}

const orden = [];
for (let i = 1; i <= TOTAL; i++) {
	const nombre = ESPECIALES[i] ?? porNumero.get(i);
	if (!nombre) {
		console.error(`Falta la imagen para la posición ${i}`);
		process.exit(1);
	}
	orden.push(nombre);
}

let convertidas = 0;
let omitidas = 0;

for (let i = 0; i < orden.length; i++) {
	const origen = join(SRC_DIR, orden[i]);
	const destino = join(
		OUT_DIR,
		`r_img${i + 1 + DESPLAZAMIENTO}.webp`,
	);

	if (existsSync(destino)) {
		console.warn(`Omitido (ya existe): ${destino.split("\\").pop()}`);
		omitidas += 1;
		continue;
	}

	await sharp(origen).webp({ quality: 78 }).toFile(destino);
	convertidas += 1;
}

console.log(
	`Listo. ${convertidas} foto(s) nueva(s), ${omitidas} omitida(s). Total del carrusel: ${DESPLAZAMIENTO + TOTAL} imágenes.`,
);

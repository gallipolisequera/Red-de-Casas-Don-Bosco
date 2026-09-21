import { readdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const DIR = join(ROOT, "public", "carrusel");

const mapping = [
	["Domingo Savio.svg", "r_img3.webp"],
	["María Auxiliadora.svg", "r_img4.webp"],
	["CIUDAD DE LOS MUCHACHOS.svg", "r_img5.webp"],
	["Domingo Savio_1.svg", "r_img6.webp"],
	["María Auxiliadora_1.svg", "r_img7.webp"],
	["CIUDAD DE LOS MUCHACHOS_1.svg", "r_img8.webp"],
	["Domingo Savio_2.svg", "r_img9.webp"],
	["María Auxiliadora_2.svg", "r_img10.webp"],
	["CIUDAD DE LOS MUCHACHOS_2.svg", "r_img11.webp"],
	["Domingo Savio_3.svg", "r_img12.webp"],
	["María Auxiliadora_3.svg", "r_img13.webp"],
	["CIUDAD DE LOS MUCHACHOS_3.svg", "r_img14.webp"],
	["Domingo Savio_4.svg", "r_img15.webp"],
	["María Auxiliadora_4.svg", "r_img16.webp"],
	["Domingo Savio_5.svg", "r_img17.webp"],
	["María Auxiliadora_5.svg", "r_img18.webp"],
	["Domingo Savio_6.svg", "r_img19.webp"],
	["María Auxiliadora_6.svg", "r_img20.webp"],
	["Domingo Savio_7.svg", "r_img21.webp"],
	["Domingo Savio_8.svg", "r_img22.webp"],
	["Domingo Savio_9.svg", "r_img23.webp"],
];

if (!existsSync(DIR)) {
	console.error(`No existe la carpeta: ${DIR}`);
	process.exit(1);
}

const existing = new Set(readdirSync(DIR));

let convertidos = 0;

for (const [src, out] of mapping) {
	if (!existing.has(src)) {
		console.warn(`Omitido (no encontrado): ${src}`);
		continue;
	}
	const inputPath = join(DIR, src);
	const outputPath = join(DIR, out);
	await sharp(inputPath)
		.resize(400, 470)
		.webp({ quality: 82 })
		.toFile(outputPath);
	console.log(`Convertido: ${src} -> ${out}`);
	convertidos += 1;
}

console.log(`Listo. ${convertidos} foto(s) convertida(s) a WebP.`);

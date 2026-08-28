import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join, parse } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const INPUT_DIR = join(ROOT, "svg");
const OUTPUT_DIR = join(ROOT, "src", "components");

const BTN_STYLE = "transform-box: fill-box; cursor: pointer;";

function formatSvg(svg) {
	const lines = svg
		.split("<")
		.map((segment, index) => (index === 0 ? segment.trim() : ("<" + segment).trim()))
		.filter((line) => line.length > 0);

	const output = [];
	let depth = 0;

	for (const line of lines) {
		if (line.startsWith("<!") || line.startsWith("<?")) {
			output.push(line);
			continue;
		}
		if (line.startsWith("</")) {
			depth = Math.max(0, depth - 1);
			output.push("\t".repeat(depth) + line);
			continue;
		}
		if (line.endsWith("/>")) {
			output.push("\t".repeat(depth) + line);
			continue;
		}
		if (line.startsWith("<")) {
			output.push("\t".repeat(depth) + injectBtnStyle(line));
			depth += 1;
			continue;
		}
		output.push("\t".repeat(depth) + line);
	}

	return output.join("\n") + "\n";
}

function injectBtnStyle(tag) {
	if (!/^<g(?:\s|>)/.test(tag)) {
		return tag;
	}
	const idMatch = tag.match(/\bid="([^"]*)"/);
	if (!idMatch || !/^btn/i.test(idMatch[1])) {
		return tag;
	}
	const styleMatch = tag.match(/\bstyle="([^"]*)"/);
	if (!styleMatch) {
		return tag.replace(/>$/, ` style="${BTN_STYLE}">`);
	}
	const existing = styleMatch[1].trim();
	const pending = BTN_STYLE.split(";")
		.map((part) => part.trim())
		.filter((part) => {
			const name = part.split(":")[0].trim();
			return name && !new RegExp(`\\b${name}\\s*:`).test(existing);
		});
	const merged = [existing.replace(/;$/, ""), ...pending].join("; ") + ";";
	return tag.replace(/\bstyle="[^"]*"/, `style="${merged}"`);
}

if (!existsSync(INPUT_DIR)) {
	console.error(`La carpeta no existe: ${INPUT_DIR}`);
	console.error("Crea la carpeta svg/ en la raíz del proyecto y coloca ahí tus archivos .txt.");
	process.exit(1);
}

const files = readdirSync(INPUT_DIR).filter((name) => name.toLowerCase().endsWith(".txt"));

if (files.length === 0) {
	console.log("No hay archivos .txt en svg/. Nada que formatear.");
	process.exit(0);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

let formateados = 0;

for (const file of files) {
	const inputPath = join(INPUT_DIR, file);
	const content = readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "");

	if (!content.includes("<svg")) {
		console.warn(`Omitido (no parece contener SVG): ${file}`);
		continue;
	}

	const formatted = formatSvg(content);
	const outputPath = join(OUTPUT_DIR, `${parse(file).name}.astro`);
	writeFileSync(outputPath, formatted, "utf8");
	console.log(`Formateado: svg/${file} -> src/components/${parse(file).name}.astro`);
	const abiertos = (content.match(/<g(?:\s|>)/g) || []).length;
	const cerrados = (content.match(/<\/g>/g) || []).length;
	if (abiertos !== cerrados) {
		console.warn(`  Aviso: <g> desbalanceados en ${file} (abiertos: ${abiertos}, cerrados: ${cerrados}).`);
	}
	formateados += 1;
}

console.log(`Listo. ${formateados} archivo(s) formateado(s).`);

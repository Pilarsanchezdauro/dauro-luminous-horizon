/**
 * Script para convertir el Excel de Isbue a JSON para importar en catalog_products
 * 
 * Uso: 
 * 1. Exporta el Excel a CSV (separado por tabuladores o punto y coma)
 * 2. Ejecuta: node scripts/excel-to-catalog-json.js input.csv output.json
 * 
 * O usa este script en el navegador pegando el contenido CSV
 */

const fs = require('fs');
const path = require('path');

// Mapeo de columnas del Excel de Isbue
// CÓDIGO | TÍTULO | ISBN | FAMILIA | PVP | DESCRIPCIÓN | EDITORIAL | [stock] | [activo] | [segunda_mano]

function parseRow(row, separator = '\t') {
  const cols = row.split(separator);
  
  if (cols.length < 6) return null;
  
  const codigo = cols[0]?.trim() || null;
  const titulo = cols[1]?.trim() || '';
  const isbn = cols[2]?.trim() || null;
  const familia = cols[3]?.trim()?.replace(/^\[|\]$/g, '') || null;
  const pvp = parseFloat(cols[4]?.replace(',', '.')) || null;
  const descripcion = cols[5]?.trim() || null;
  const editorial = cols[6]?.trim() || 'Ediciones Dauro';
  
  // Columnas 8, 9, 10 para estado
  const activo = cols[8]?.toLowerCase() !== 'no';
  const segundaMano = cols[9]?.toLowerCase() === 'sí' || cols[9]?.toLowerCase() === 'si';

  if (!titulo) return null;

  return {
    codigo,
    titulo,
    isbn,
    familia,
    pvp,
    descripcion: cleanDescription(descripcion),
    editorial,
    activo,
    segunda_mano: segundaMano,
    imagen_url: null
  };
}

function cleanDescription(desc) {
  if (!desc) return null;
  
  // Eliminar iframes y HTML
  let clean = desc
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\\</g, '<')
    .replace(/ACCEDE A LA LECTURA DE LAS PRIMERAS PÁGINAS.*/gi, '')
    .trim();
  
  return clean;
}

function convertCsvToJson(csvContent, separator = '\t') {
  const lines = csvContent.split('\n');
  const products = [];
  
  // Saltar la cabecera
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const product = parseRow(line, separator);
    if (product) {
      products.push(product);
    }
  }
  
  return products;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Uso: node excel-to-catalog-json.js <input.csv> <output.json> [separator]');
    console.log('Separador por defecto: tabulador (\\t)');
    console.log('Otros separadores: ; o ,');
    process.exit(1);
  }
  
  const inputFile = args[0];
  const outputFile = args[1];
  const separator = args[2] || '\t';
  
  const csvContent = fs.readFileSync(inputFile, 'utf8');
  const products = convertCsvToJson(csvContent, separator);
  
  fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
  console.log(`✓ Convertidos ${products.length} productos a ${outputFile}`);
}

module.exports = { convertCsvToJson, parseRow };

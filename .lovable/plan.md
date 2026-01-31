
## Plan: Ampliar Floating Author Cards

### Cambios a realizar

#### 1. Copiar las nuevas imágenes de autores

Guardar las 4 nuevas imágenes en `public/authors/`:

| Archivo origen | Destino |
|----------------|---------|
| `RETRATO_ANTONIO_RODRÍGUEZ_JIMÉNEZ.png` | `public/authors/antonio-rodriguez-jimenez.png` |
| `RETRATO_MIGUEL_PUCHE-2.png` | `public/authors/miguel-puche.png` (reemplaza la existente) |
| `RETRATO_ELEAZAR_SANTANA.png` | `public/authors/eleazar-santana.png` |
| `RETRATO_PILAR_SÁNCHEZ.png` | `public/authors/pilar-sanchez.png` |

---

#### 2. Aumentar el tamaño de las imágenes

**Tamaños actuales:**
```
w-20 h-28 sm:w-24 sm:h-32  (80x112px → 96x128px)
```

**Nuevos tamaños (aproximadamente 50% más grande):**
```
w-28 h-40 sm:w-36 sm:h-48  (112x160px → 144x192px)
```

Esto hará las tarjetas más visibles y los retratos artísticos lucirán mejor.

---

#### 3. Actualizar el array de autores

```typescript
const AUTHORS: Author[] = [
  { id: "benito", name: "Benito Lamenca", image: "/authors/benito-lamenca.png" },
  { id: "carlos", name: "Carlos Blanco", image: "/authors/carlos-blanco.png" },
  { id: "carmen", name: "Carmen Alcaide", image: "/authors/carmen-alcaide.png" },
  { id: "miguel", name: "Miguel Puche", image: "/authors/miguel-puche.png" },
  { id: "paco", name: "Paco López Barrios", image: "/authors/paco-lopez-barrios.png" },
  { id: "manuel", name: "Manuel Orozco", image: "/authors/manuel-orozco.png" },
  // Nuevos autores:
  { id: "antonio", name: "Antonio Rodríguez Jiménez", image: "/authors/antonio-rodriguez-jimenez.png" },
  { id: "eleazar", name: "Eleazar Santana", image: "/authors/eleazar-santana.png" },
  { id: "pilar", name: "Pilar Sánchez", image: "/authors/pilar-sanchez.png" },
];
```

Total: **9 autores** en rotación.

---

#### 4. Ajustes adicionales de estilo

- Aumentar ligeramente el padding del contenedor para las imágenes más grandes
- Ajustar el tamaño del texto del nombre del autor para que sea proporcional
- Mantener el borde decorativo y efectos hover

---

### Archivo a modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/FloatingAuthorCard.tsx` | Actualizar AUTHORS array, aumentar tamaños de imagen |

### Resultado esperado

Las floating author cards serán más grandes y visualmente impactantes, con los 9 autores rotando aleatoriamente por la pantalla.

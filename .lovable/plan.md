

## Plan: Mejoras en la Calculadora de Autoedición

### Resumen de cambios solicitados

1. **Corregir la instrucción de cálculo de páginas** - Explicar que un documento A4 con Times New Roman y 1,5 de interlineado necesita aumentarse aproximadamente un 30% para obtener las páginas reales del libro en A5.

2. **Cambiar el formulario de contacto** - En lugar de "enviar presupuesto por email", el mensaje debe ser: solicitar más detalles del presupuesto y una **prevaloracion profesional GRATIS** de la obra antes de decidirse a publicar.

3. **Destacar la prevaloracion gratis como extra** - Este beneficio debe reflejarse visualmente en la web como un valor añadido.

---

### Cambios técnicos

#### 1. Instrucción de cálculo de páginas (Líneas 476-479)

**Texto actual:**
> "📝 Copia tu texto en un documento A4 (tamaño folio) con Times New Roman a 1,5 de interlineado para saber cuántas páginas tiene."

**Nuevo texto:**
> "📝 Copia tu texto en un documento A4 (tamaño folio) con Times New Roman a 1,5 de interlineado. Después, aumenta ese número de páginas un 30% para obtener la extensión real que tendrá tu libro maquetado en formato A5."

Con un ejemplo práctico debajo:
> "💡 Ejemplo: Si tu documento A4 tiene 100 páginas → el libro tendrá aproximadamente 130 páginas"

---

#### 2. Reformular la sección de contacto (Líneas 834-879)

**Cambios:**

- **Nuevo título y mensaje**: Cambiar de "Déjanos tus datos y te enviaremos el presupuesto por email" a destacar la prevaloracion profesional gratuita.

- **Nuevo mensaje principal:**
  > "🎯 Solicita más detalles y una prevaloracion profesional GRATIS de tu obra antes de decidirte a publicar con nosotros"

- **Botón**: Cambiar texto de "Solicitar presupuesto gratuito" a "Solicitar prevaloracion gratuita"

- **Nota al pie**: Actualizar para reflejar que recibirán valoración profesional sin compromiso.

---

#### 3. Destacar la prevaloracion gratis como extra visible

Añadir un banner destacado antes del formulario de contacto con:

```text
┌────────────────────────────────────────────────────────────────┐
│  ✨ EXTRA EXCLUSIVO                                           │
│  ─────────────────────────────────────────────────────────────│
│  📋 Prevaloracion profesional GRATIS                         │
│                                                                │
│  Nuestro equipo editorial analizará tu obra y te dará        │
│  una valoración profesional sin compromiso antes de que      │
│  decidas publicar.                                            │
└────────────────────────────────────────────────────────────────┘
```

Este banner usará estilos similares a los beneficios de "Tesis Doctoral" (fondo verde/primary suave, borde, iconos).

---

### Archivos a modificar

| Archivo | Líneas | Cambio |
|---------|--------|--------|
| `src/components/AutoedicionCalculator.tsx` | 476-479 | Actualizar instrucciones de cálculo de páginas con el +30% |
| `src/components/AutoedicionCalculator.tsx` | 834-879 | Reformular sección de contacto para destacar prevaloracion gratis |

---

### Resultado esperado

- Los usuarios entenderán claramente que deben aumentar un 30% las páginas de su documento A4 para obtener la extensión real del libro en A5.
- El formulario de contacto ya no se presenta como "enviar presupuesto" (ya tienen el PDF descargable), sino como una oportunidad para recibir una valoración profesional gratuita de su obra.
- La prevaloracion gratis se presenta como un beneficio exclusivo visible y atractivo.


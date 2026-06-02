# Parcial 2 — Simulación (UTN)

Landing interactiva para preparar el **Parcial 2 de Simulación** (sistema de colas, Runge-Kutta, vector estado). Incluye los 3 turnos del parcial con sus preguntas teóricas y numéricas + el Excel con las iteraciones que pide cada consigna.

## Turnos incluidos

- **Turno 1 — Médicos** (guardia médica con 2 médicos, generales y especializados)
- **Turno 2 — Drones** (centro técnico con 2 técnicos)
- **Turno 3 — Camiones** (estación de servicio con 2 mecánicos colaborativos)

## Cómo usar

Abrí `index.html` con doble click — no requiere server ni dependencias.

## Cómo agregar un turno nuevo

1. Crear `data/turnoN.js` siguiendo la estructura de los existentes.
2. Sumarlo en `index.html`:
   ```html
   <script src="data/turnoN.js"></script>
   ```
3. Agregarlo al array `TURNOS` en `app.js`.

## Regenerar el Excel de iteraciones

```bash
python build-iteraciones.py
```

Combina los 3 archivos starter de los profes en un único workbook por turno (`assets/Tema-N-Iteraciones.xlsx`), con una hoja por fragmento y sólo el evento inicial cargado para que el alumno complete el resto.

## Stack

HTML + CSS + JS vanilla. Cero dependencias en runtime.

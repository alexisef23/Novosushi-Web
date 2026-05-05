# 📁 Imágenes del Menú — Novo Sushi

Coloca aquí las fotos de tus platillos organizadas por categoría.

## Estructura esperada

```
images/
├── hero/
│   └── hero-bg.png         ← Foto del restaurante (1920×1080 px, JPG/PNG)
├── logo/
│   └── novo-sushi-logo.png ← Tu logotipo (fondo transparente, PNG/SVG)
├── about/
│   └── restaurante.jpg     ← Foto del local/equipo
└── menu/
    ├── entradas/
    │   ├── gyoza.jpg
    │   └── edamame.jpg
    ├── rolls-clasicos/
    │   ├── california.jpg
    │   └── spicy-tuna.jpg
    ├── rolls-especiales/
    │   ├── volcano.jpg
    │   └── dragon.jpg
    ├── sashimi/
    │   ├── salmon.jpg
    │   └── atun.jpg
    ├── bebidas/
    │   └── sake.jpg
    └── postres/
        └── mochi.jpg
```

## Tamaños recomendados

| Uso | Resolución | Formato | Max peso |
|-----|-----------|---------|---------|
| Hero | 1920×1080 | JPG | 500 KB |
| Tarjetas menú | 800×600 | JPG/WebP | 150 KB |
| Logo | Cualquiera | PNG/SVG | 50 KB |

## Cómo actualizar una foto en el menú

1. Agrega tu foto a la carpeta correspondiente
2. Abre `src/data/menu.json`
3. Edita el campo `"image"` del platillo, por ejemplo:
   ```json
   "image": "/images/menu/rolls-clasicos/california.jpg"
   ```
4. ¡Listo! No necesitas cambiar nada más en el código.

## Herramientas para optimizar imágenes

- **Squoosh**: https://squoosh.app (recomendado)
- **TinyPNG**: https://tinypng.com

# 🚀 ¡Comienza Aquí! Guía de Inicio Rápido

Bienvenido a la práctica de **Despliegue de API REST con SAM y GitHub Actions**.

Este archivo es tu punto de entrada. Te guiará a dónde ir según tu situación.

---

## 📍 ¿Dónde Estoy?

Estás en la carpeta `sesiones_7_8_sam_cicd/` que contiene dos prácticas sobre AWS SAM:

1. **Despliegue Blue/Green** (carpeta `bluegreen/`) - Despliegue con estrategia de mitigación de riesgos
2. **Despliegue CI/CD** (carpeta `cicd/`) - Despliegue mediante GitHub Actions ← **TÚ ESTÁS AQUÍ**

---

## 🎯 Elige tu Camino

### ✅ Si tienes **poco tiempo** (5-10 minutos)

Lee: **[RESUMEN_RAPIDO.md](./RESUMEN_RAPIDO.md)**

Contiene:
- Checklist de 5 minutos
- Comandos esenciales
- Cronograma
- FAQ rápida

---

### ✅ Si quieres **hacerlo bien** (2-3 horas)

Lee: **[GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md)**

Contiene:
- Guía paso a paso detallada
- Explicaciones profundas
- Capturas esperadas en cada etapa
- Todo lo que necesitas saber

**Recomendado si:** Es tu primera vez con GitHub Actions o CI/CD

---

### ✅ Si necesitas **resolver un problema**

Ve a: **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

Contiene:
- Problemas comunes y soluciones
- FAQ con 20+ preguntas
- Tabla de troubleshooting

**Busca tu error:** Encontrarás solución rápida

---

### ✅ Si necesitas **crear la memoria/informe**

Usa: **[PLANTILLA_MEMORIA.md](./PLANTILLA_MEMORIA.md)**

Contiene:
- Estructura completa de memoria
- Plantillas de secciones
- Ejemplos de contenido
- Tablas y diagramas

**Simplemente:** Sigue la plantilla y completa con tus capturas

---

### ✅ Si necesitas **referencia rápida**

Consulta: **[REFERENCIA_RAPIDA.md](./REFERENCIA_RAPIDA.md)**

Contiene:
- URLs importantes
- Comandos clave
- Configuraciones
- Atajos útiles

**Úsalo como:** Cheat sheet durante la práctica

---

### ✅ Si quieres **ir más allá**

Explora: **[EJERCICIOS_OPCIONALES.md](./EJERCICIOS_OPCIONALES.md)**

Contiene:
- Ejercicios Nivel 1 (Principiante)
- Ejercicios Nivel 2 (Intermedio)
- Ejercicios Nivel 3 (Avanzado)
- Desafíos y proyecto final

**Para:** Profundizar y aprender más

---

### ✅ Si quieres **entender todo**

Lee: **[INDICE_DOCUMENTACION.md](./INDICE_DOCUMENTACION.md)**

Contiene:
- Descripción de cada documento
- Búsqueda por tema
- Flujos de aprendizaje
- Links entre documentos

**Mejor para:** Navegar toda la documentación

---

## ⚡ Secuencia Recomendada

### Para Principiantes (Primera vez)

```
1. Este archivo (00_COMIENZA_AQUI.md)
   ↓
2. RESUMEN_RAPIDO.md (5 min)
   ↓
3. GUIA_CICD_COMPLETA.md (30-45 min lectura)
   ↓
4. Ejecutar la práctica (2-3 horas)
   ↓
5. PLANTILLA_MEMORIA.md (1-2 horas redacción)
   ↓
6. Si hay problemas → TROUBLESHOOTING.md
```

### Para Expertos (Que conocen CI/CD)

```
1. RESUMEN_RAPIDO.md (5 min)
   ↓
2. Ejecutar según checklist (30-50 min pipeline)
   ↓
3. PLANTILLA_MEMORIA.md para documentar
   ↓
4. EJERCICIOS_OPCIONALES.md si quieres más
```

### Para Resolver Problemas

```
1. Identificar el error
   ↓
2. TROUBLESHOOTING.md
   ↓
3. Buscar tu error específico
   ↓
4. Seguir la solución propuesta
   ↓
5. Si persiste → REFERENCIA_RAPIDA.md o GUIA_CICD_COMPLETA.md
```

---

## 📚 Estructura de Documentos

```
00_COMIENZA_AQUI.md (← TÚ ESTÁS AQUÍ)
│
├─ RESUMEN_RAPIDO.md (5 min)
│  └─ Checklist, comandos, FAQ rápida
│
├─ GUIA_CICD_COMPLETA.md (30-45 min lectura)
│  └─ Guía paso a paso detallada
│
├─ PLANTILLA_MEMORIA.md (1-2 horas redacción)
│  └─ Estructura y plantillas para tu informe
│
├─ TROUBLESHOOTING.md (consulta según necesidad)
│  └─ Problemas comunes y soluciones
│
├─ REFERENCIA_RAPIDA.md (consulta durante práctica)
│  └─ Cheat sheet de URLs, comandos, configuraciones
│
├─ EJERCICIOS_OPCIONALES.md (para profundizar)
│  └─ Ejercicios adicionales y desafíos
│
├─ INDICE_DOCUMENTACION.md (navegación)
│  └─ Índice completo con búsqueda
│
└─ README.md (contexto general)
   └─ Descripción del proyecto y ambas prácticas
```

---

## 🎯 Objetivos de la Práctica

Al terminar, habrás aprendido a:

- ✅ Crear un pipeline CI/CD con GitHub Actions
- ✅ Desplegar aplicaciones serverless con AWS SAM
- ✅ Implementar tests unitarios e integración
- ✅ Automatizar despliegues en múltiples entornos
- ✅ Requerir aprobación manual antes de producción
- ✅ Monitorizar despliegues y aplicaciones

---

## ⏱️ Cronograma Estimado

| Fase | Duración |
|------|----------|
| Lectura de documentación | 30-45 min |
| Preparación de archivos | 10 min |
| Pipeline ejecutándose | 30-50 min |
| Pruebas y aprobación | 5 min |
| Creación de memoria | 1-2 horas |
| **TOTAL** | **2-4 horas** |

---

## 🚨 Antes de Empezar

Asegúrate de tener:

- ✅ Cuenta de GitHub creada
- ✅ Credenciales de AWS Academy (access key, secret key, session token)
- ✅ Git instalado en tu máquina
- ✅ Editor de texto (VS Code, etc.)
- ✅ Curl o Postman para probar API

---

## 🎓 Niveles de Profundidad

### Nivel 1: Solo Completar la Práctica
- Seguir GUIA_CICD_COMPLETA.md
- Hacer que funcione
- Crear memoria básica

### Nivel 2: Entender lo que Ocurre
- Leer explicaciones detalladas
- Comprender cada etapa del pipeline
- Documentar lo aprendido

### Nivel 3: Dominar el Tema
- Hacer ejercicios adicionales
- Crear tu propia API
- Resolver problemas sin ayuda

---

## 🔗 Links Rápidos por Necesidad

| Necesito... | Ir a... |
|------------|--------|
| Empezar rápido | [RESUMEN_RAPIDO.md](./RESUMEN_RAPIDO.md) |
| Aprender paso a paso | [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md) |
| Resolver un error | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Crear mi informe | [PLANTILLA_MEMORIA.md](./PLANTILLA_MEMORIA.md) |
| Referencia rápida | [REFERENCIA_RAPIDA.md](./REFERENCIA_RAPIDA.md) |
| Ejercicios adicionales | [EJERCICIOS_OPCIONALES.md](./EJERCICIOS_OPCIONALES.md) |
| Navegar todo | [INDICE_DOCUMENTACION.md](./INDICE_DOCUMENTACION.md) |

---

## 💡 Consejos Importante

1. **Lee completo antes de empezar**: Evita sorpresas
2. **Ten todo listo**: Credenciales, editor, terminal
3. **Toma capturas mientras avanzas**: Para documentar después
4. **Lee los logs si algo falla**: Usualmente indican el problema
5. **No canceles el pipeline**: Tarda lo que tarda (30-50 min)
6. **Documenta mientras haces**: No dejes la memoria para el final

---

## ❓ Preguntas Frecuentes

**P: ¿Por dónde comienzo exactamente?**
R: Si es primera vez → [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md)
Si tienes prisa → [RESUMEN_RAPIDO.md](./RESUMEN_RAPIDO.md)

**P: ¿Cuánto tiempo toma?**
R: 2-4 horas incluyendo espera del pipeline y documentación

**P: ¿Necesito experiencia previa?**
R: No, pero ayuda si conoces Git y programación básica

**P: ¿Qué si algo falla?**
R: Ve a [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) para soluciones

**P: ¿Es obligatorio hacer los ejercicios opcionales?**
R: No, pero son recomendados si tienes tiempo

---

## ✅ Quick Start (Para Expertos)

```bash
# 1. Clonar código
git clone https://github.com/tu-usuario/sam-api-cicd.git
cd sam-api-cicd

# 2. Crear estructura de workflows
mkdir -p .github/workflows
cp pipeline.yaml .github/workflows/

# 3. Configurar secretos en GitHub

# 4. Hacer push
git push

# 5. Ver pipeline en GitHub Actions

# 6. Aprobar despliegue cuando pida

# 7. Probar API
curl https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/

# 8. Crear memoria
# Usa PLANTILLA_MEMORIA.md
```

---

## 🎓 ¿Necesitas Ayuda Específica?

### "No sé por dónde empezar"
→ Comienza con [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md), Paso 1

### "Tengo poco tiempo"
→ Lee [RESUMEN_RAPIDO.md](./RESUMEN_RAPIDO.md) (5 min)

### "Algo no funciona"
→ Ve a [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) y busca tu error

### "¿Cómo hago mi memoria?"
→ Usa [PLANTILLA_MEMORIA.md](./PLANTILLA_MEMORIA.md)

### "¿Qué comando debo usar?"
→ Consulta [REFERENCIA_RAPIDA.md](./REFERENCIA_RAPIDA.md)

### "¿Qué hace cada parte del pipeline?"
→ Lee [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md), Paso 8

### "Quiero aprender más"
→ Ve a [EJERCICIOS_OPCIONALES.md](./EJERCICIOS_OPCIONALES.md)

---

## 🚀 ¡Vamos!

**Elige tu camino arriba y comienza.**

El documento que necesites te esperará con instrucciones claras y detalladas.

**Buena suerte, y que disfrutes aprendiendo sobre CI/CD y serverless en AWS** 🎉

---

## 📞 Si Algo No Está Claro

1. Verifica el documento correspondiente
2. Busca la sección relevante
3. Si aún no funciona, consulta [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
4. Contacta a tu instructor si es educativo

---

**Última actualización**: Junio 2026

*Este documento es tu brújula. Los otros documentos son tu mapa detallado.*

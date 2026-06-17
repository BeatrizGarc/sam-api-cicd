# Índice de Documentación: Despliegue CI/CD con SAM y GitHub Actions

Esta documentación completa te guiará a través de toda la práctica. Selecciona el documento que necesites según tu situación.

---

## 🎯 Empezar Aquí

### ¿Poco tiempo? (5-10 minutos)
**→ Leer: [RESUMEN_RAPIDO.md](./RESUMEN_RAPIDO.md)**
- Checklist rápido
- Comandos clave
- Cronograma estimado

### ¿Tiempo limitado? (30-45 minutos)
**→ Leer: [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md) - Secciones 1-3**
- Requisitos previos
- Crear repositorio
- Configurar GitHub

### ¿Quieres hacerlo bien? (2-3 horas)
**→ Leer: [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md) - Completo**
- Guía paso a paso detallada
- Explicaciones profundas
- Best practices

---

## 📚 Documentos Disponibles

### 1. **RESUMEN_RAPIDO.md** (⏱️ 5 min)
**Para**: Usuarios con prisa, necesito ir rápido
**Contiene**:
- TL;DR (síntesis ejecutiva)
- Checklist de 5 minutos
- Comandos esenciales
- Tabla de troubleshooting rápida
- Cronograma estimado

**Cuándo usar**:
- Ya entiendes CI/CD
- Solo necesitas recordar los pasos
- Tienes experiencia previa

---

### 2. **GUIA_CICD_COMPLETA.md** (⏱️ 30-45 min de lectura, 2-3 horas de ejecución)
**Para**: Todos los estudiantes (guía principal)
**Contiene**:
- Requisitos previos con detalles
- Paso 1-13: Instrucciones detalladas
- Explicaciones técnicas profundas
- Capturas esperadas en cada etapa
- Memoria de la práctica

**Secciones principales**:
1. Requisitos Previos
2. Crear Repositorio en GitHub (con imágenes de cada paso)
3. Preparar Archivos Locales
4. Configurar GitHub Actions (Secretos, Entornos)
5. Ejecutar el Pipeline
6. Aprobar Despliegue a Producción
7. Probar la API
8. Crear Memoria

**Cuándo usar**:
- Es tu primera vez con GitHub Actions
- Necesitas explicaciones detalladas
- Quieres entender qué ocurre en cada paso

---

### 3. **PLANTILLA_MEMORIA.md** (⏱️ 1-2 horas de redacción)
**Para**: Crear la memoria/informe de la práctica
**Contiene**:
- Estructura completa de memoria
- Plantillas de secciones
- Tablas de captura de información
- Ejemplos de contenido
- Diagramas ASCII
- Diagrama de arquitectura

**Secciones**:
1. Portada
2. Introducción (qué es CI/CD)
3. Descripción de Arquitectura (con diagrama)
4. Pasos Realizados (plantilla para documentar cada uno)
5. Pipeline de CI/CD (análisis de cada etapa)
6. Recursos Creados en AWS
7. Ventajas de CI/CD (reflexión)
8. Problemas y Soluciones (tabla)
9. Conclusiones
10. Anexos (comandos, URLs, etc.)

**Cuándo usar**:
- Necesitas crear un informe/memoria de la práctica
- Buscas estructura y plantillas
- Quieres ejemplos de contenido

---

### 4. **TROUBLESHOOTING.md** (⏱️ Búsqueda según necesidad)
**Para**: Resolver problemas cuando algo falla
**Contiene**:
- Problemas de credenciales (InvalidClientTokenId, AccessDenied, etc.)
- Problemas de pipeline (npm errors, compilation errors, tests failing)
- Problemas de despliegue (Stack already exists, Lambda fails, etc.)
- Problemas de API (404, 502, CORS, Timeout)
- FAQ con respuestas completas
- Tabla de troubleshooting rápido

**Secciones**:
1. Problemas de Credenciales (5 problemas comunes)
2. Problemas de Pipeline (6 problemas)
3. Problemas de Despliegue (6 problemas)
4. Problemas de API (5 problemas)
5. FAQ (20+ preguntas frecuentes)

**Cuándo usar**:
- Algo no funciona correctamente
- Ves un error y no sabes cómo resolverlo
- Tienes una pregunta frecuente

**Cómo usar**:
1. Busca la sección que corresponde a tu error
2. Lee el síntoma para verificar si es tu caso
3. Sigue la solución paso a paso
4. Si no funciona, ve a FAQ o contacta

---

### 5. **README.md** (Archivo original actualizado)
**Para**: Contexto general del proyecto
**Contiene**:
- Descripción de las dos arquitecturas (blue/green y CI/CD)
- Links a todas las guías
- Instrucciones de las dos prácticas

**Cuándo usar**:
- Necesitas entender el contexto general
- Quieres saber qué hay disponible
- Buscar links a otros recursos

---

## 🗂️ Estructura de Archivos

```
sesiones_7_8_sam_cicd/
├── README.md                      ← Contexto general
├── INDICE_DOCUMENTACION.md        ← Tú estás aquí
├── RESUMEN_RAPIDO.md              ← Guía de 5 minutos
├── GUIA_CICD_COMPLETA.md          ← Guía detallada (30-45 min lectura)
├── PLANTILLA_MEMORIA.md           ← Plantilla para tu informe
├── TROUBLESHOOTING.md             ← Solución de problemas
│
├── cicd/                          ← Código de la aplicación
│   ├── src/
│   ├── __tests__/
│   ├── events/
│   ├── integracion/
│   ├── template.yaml
│   ├── pipeline.yaml
│   └── package.json
│
├── bluegreen/                     ← Otra arquitectura (no es esta práctica)
├── cliente-api-cicd/              ← Cliente web para probar la API
└── imagenes/                      ← Imágenes de referencia
```

---

## 🎓 Flujo de Aprendizaje Recomendado

### Opción 1: Aprendizaje Completo (Recomendado para aprender)

```
1. Leer RESUMEN_RAPIDO.md (5 min)
   ↓
2. Leer GUIA_CICD_COMPLETA.md Requisitos (5 min)
   ↓
3. Preparar credenciales de AWS
   ↓
4. Ejecutar Pasos 1-5 de GUIA_CICD_COMPLETA.md (30 min)
   ↓
5. Monitorear pipeline (30-50 min esperando)
   ↓
6. Ejecutar Pasos 6-9 de GUIA_CICD_COMPLETA.md (15 min)
   ↓
7. Probar API (5 min)
   ↓
8. Usar PLANTILLA_MEMORIA.md para crear informe (60 min)
   ↓
9. Si hay problemas, consultar TROUBLESHOOTING.md
```

### Opción 2: Aprendizaje Acelerado (Si ya conoces CI/CD)

```
1. Leer RESUMEN_RAPIDO.md (5 min)
   ↓
2. Ejecutar comandos del checklist (15 min)
   ↓
3. Aprobar despliegue (2 min)
   ↓
4. Usar PLANTILLA_MEMORIA.md (30 min)
   ↓
5. Si hay problemas, TROUBLESHOOTING.md
```

### Opción 3: Solo Resolución de Problemas

```
1. Identificar el error
   ↓
2. Buscar en TROUBLESHOOTING.md
   ↓
3. Seguir la solución propuesta
   ↓
4. Si persiste, revisar GUIA_CICD_COMPLETA.md sección relevante
```

---

## 🔍 Búsqueda Rápida por Tema

### Crear el Repositorio
**→ GUIA_CICD_COMPLETA.md → Paso 1** (o RESUMEN_RAPIDO.md → GitHub Setup)

### Configurar Credenciales de AWS
**→ GUIA_CICD_COMPLETA.md → Requisitos Previos** (o RESUMEN_RAPIDO.md → GitHub Secrets)

### Configurar GitHub Actions
**→ GUIA_CICD_COMPLETA.md → Paso 3** o **RESUMEN_RAPIDO.md → GitHub Setup**

### Entender el Pipeline
**→ GUIA_CICD_COMPLETA.md → Paso 4 + Paso 8** (Análisis de cada etapa)

### Aprobar Despliegue
**→ GUIA_CICD_COMPLETA.md → Paso 5** o **RESUMEN_RAPIDO.md → Aprobar Despliegue**

### Probar la API
**→ GUIA_CICD_COMPLETA.md → Paso 6** o **RESUMEN_RAPIDO.md → Probar API**

### Error de Credenciales
**→ TROUBLESHOOTING.md → Problemas de Credenciales**

### Error en Pipeline
**→ TROUBLESHOOTING.md → Problemas de Pipeline**

### Error en Despliegue
**→ TROUBLESHOOTING.md → Problemas de Despliegue**

### Error en API
**→ TROUBLESHOOTING.md → Problemas de API**

### Pregunta Frecuente
**→ TROUBLESHOOTING.md → FAQ** (busca tu pregunta)

### Crear Memoria/Informe
**→ PLANTILLA_MEMORIA.md**

---

## 📋 Requisitos Previos Resumidos

Antes de empezar, necesitas tener listos:

- ✅ Cuenta GitHub
- ✅ Credenciales AWS Academy:
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - AWS_SESSION_TOKEN
- ✅ Git instalado
- ✅ Curl o Postman para probar API
- ✅ Editor de texto (VS Code, Sublime, etc.)

**Nota**: Los tokens expiran cada 4-6 horas. Anotatelos antes de empezar.

---

## ⏱️ Estimación de Tiempo

| Actividad | Duración | Notas |
|-----------|----------|-------|
| Leer documentación | 30-45 min | Depende de profundidad |
| Preparar archivos | 10 min | Copiar archivos locales |
| Crear repo GitHub | 5 min | Interfaz web |
| Configurar secretos | 5 min | Interfaz web |
| Crear entorno | 2 min | Interfaz web |
| **Pipeline ejecutándose** | **30-50 min** | **No requiere acción, solo espera** |
| Aprobar despliegue | 2 min | Interfaz web |
| Probar API | 5 min | curl/Postman |
| Crear memoria | 1-2 horas | Redacción con capturas |
| **TOTAL** | **2-4 horas** | **Depende del nivel de detalle** |

---

## 🚀 Comandos Clave Rápidos

```bash
# Configurar Git localmente
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Crear estructura
mkdir -p .github/workflows

# Commits
git add .
git commit -m "mensaje"
git push -u origin main

# Probar API
curl https://api-url/
curl -X POST https://api-url/ -H "Content-Type: application/json" -d '{"id":"1"}'

# Eliminar stack de AWS (si necesitas)
sam delete --stack-name todo-app-prod --region us-east-1
```

---

## 🎯 Objetivos de la Práctica

Al completar todos los documentos y la práctica, habrás logrado:

- ✅ Entender qué es CI/CD y por qué es importante
- ✅ Crear un pipeline de CI/CD con GitHub Actions
- ✅ Usar SAM para desplegar aplicaciones serverless
- ✅ Implementar tests unitarios e integración
- ✅ Requerir aprobación manual antes de producción
- ✅ Desplegar en múltiples entornos (testing, production)
- ✅ Automatizar despliegues de forma segura
- ✅ Documentar y comunicar el proceso

---

## 💡 Tips Finales

1. **Lee COMPLETO antes de empezar**: Evita sorpresas
2. **Ten los tokens de AWS listos**: No los esperes a último momento
3. **Toma capturas mientras ejecutas**: Para documentar la memoria
4. **Lee los logs del pipeline**: Usualmente indican el problema
5. **No canceles el pipeline prematuramente**: Tarda lo que tarda
6. **Documenta mientras avanzas**: No dejes la memoria para el final
7. **Verifica URLs cuidadosamente**: Un carácter mal arruina todo
8. **Reutiliza la plantilla de memoria**: Ahorra tiempo

---

## 🆘 Si Necesitas Ayuda

1. **Leer la sección relevante** en TROUBLESHOOTING.md
2. **Buscar en FAQ** del mismo archivo
3. **Revisar GUIA_CICD_COMPLETA.md** para contexto
4. **Verificar logs** de GitHub Actions (normalmente indican el problema)
5. **Google el error**: Seguramente ya alguien lo resolvió
6. **Contactar instructor/profesor** si es educativo

---

## ✅ Checklist Final

Antes de presentar tu trabajo:

- ✅ Repositorio GitHub creado y público
- ✅ Pipeline ejecutado exitosamente
- ✅ Despliegue aprobado y completado
- ✅ API testeada y funcionando
- ✅ Stack de testing eliminado
- ✅ Stack de producción activo
- ✅ Memoria completada con capturas
- ✅ URL del repositorio incluida en memoria
- ✅ Explicaciones de cada paso (CI/CD, arquitectura, etc.)
- ✅ Conclusiones documentadas

---

## 📞 Preguntas Frecuentes Rápidas

**P: ¿Por dónde empiezo?**
R: RESUMEN_RAPIDO.md (5 min) → GUIA_CICD_COMPLETA.md (30 min lectura)

**P: ¿Cuánto tiempo toma?**
R: 2-4 horas incluyendo espera del pipeline y documentación

**P: ¿Qué pasa si falla algo?**
R: TROUBLESHOOTING.md tiene soluciones para problemas comunes

**P: ¿Es obligatorio crear memoria?**
R: Sí, la mayoría de cursos lo requieren. Usa PLANTILLA_MEMORIA.md

**P: ¿Puedo usar diferentes regiones?**
R: Sí, pero mantén consistencia. GUIA_CICD_COMPLETA.md explica cómo

**P: ¿Los tokens nunca expiran?**
R: No, expiran cada 4-6 horas. Debes renovarlos. Ver TROUBLESHOOTING.md

---

**Última actualización**: Junio 2026

**¡Ahora estás listo! Comienza con [RESUMEN_RAPIDO.md](./RESUMEN_RAPIDO.md) o [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md) según tu nivel.**

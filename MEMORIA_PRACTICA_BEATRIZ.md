# MEMORIA: Despliegue de API REST con SAM y GitHub Actions CI/CD

## 1. Portada

**Práctica**: Despliegue de API REST con SAM y GitHub Actions  
**Alumno/a**: BeatrizGarc  
**Fecha**: Junio 2026  
**Repositorio**: https://github.com/BeatrizGarc/sam-api-cicd  
**URL de la API**: https://qnjz0exctc.execute-api.us-east-1.amazonaws.com/Prod/

---

## 2. Introducción

### ¿Qué es CI/CD?

CI/CD (Integración Continua / Entrega Continua) es una metodología que automatiza el ciclo de vida del software:

- **CI (Integración Continua)**: Los desarrolladores integran código frecuentemente. Cada integración se valida automáticamente con tests.
- **CD (Entrega Continua)**: El código validado se despliega automáticamente en entornos de prueba y, tras aprobación, en producción.

### Ventajas de CI/CD

- ✅ Reduce errores manuales
- ✅ Feedback inmediato sobre la calidad del código
- ✅ Deployments más rápidos (minutos en lugar de días)
- ✅ Mayor confiabilidad gracias a tests automáticos
- ✅ Facilita rollback si algo falla

### Objetivos de la Práctica

- ✅ Crear un pipeline CI/CD con GitHub Actions
- ✅ Desplegar aplicación serverless con AWS SAM
- ✅ Implementar tests unitarios e integración
- ✅ Usar múltiples entornos (testing y producción)
- ✅ Requerir aprobación manual antes de producción
- ✅ Automatizar despliegues

---

## 3. Arquitectura

### Diagrama de Flujo

```
GitHub Repository
    ↓ (push)
GitHub Actions Pipeline
  1. Tests Unitarios ✅
  2. Build & Package ✅
  3. Deploy Testing ✅
  4. Integration Tests ✅
  5. Manual Review ⏸️
  6. Deploy Production ✅
  7. Cleanup ✅
    ↓
AWS (Lambda, API Gateway, DynamoDB)
```

### Componentes Principales

1. **GitHub Actions**: Orquestador del pipeline
2. **AWS SAM**: Framework para aplicaciones serverless
3. **AWS Lambda**: 3 funciones para manejar requests
4. **API Gateway**: Endpoint HTTPS público
5. **DynamoDB**: Base de datos NoSQL

---

## 4. Pasos Realizados

### ✅ Paso 1: Crear Repositorio en GitHub

Creé un nuevo repositorio público en https://github.com/BeatrizGarc/sam-api-cicd para albergar el código y la configuración del pipeline.

### ✅ Paso 2: Preparar Archivos Locales

Copié la estructura de la aplicación SAM:
- Código fuente en `src/handlers/`
- Tests unitarios en `__tests__/`
- Tests de integración en `integracion/`
- Configuración en `template.yaml` y `package.json`

### ✅ Paso 3: Configurar Secretos en GitHub

Agregué tres secretos con credenciales de AWS Academy:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

### ✅ Paso 4: Crear Entorno con Aprobación Manual

Creé el entorno `testenv` en Settings → Environments que requiere aprobación manual antes de desplegar a producción.

### ✅ Paso 5: Hacer Cambios y Disparar Pipeline

Modifiqué `get-all-items.mjs` para mejorar la respuesta, luego hice push. El pipeline se disparó automáticamente.

### ✅ Paso 6: Corregir Tests

Actualicé los tests unitarios e integración para que coincidan con la nueva estructura de respuesta.

### ✅ Paso 7-9: Pipeline Completo

El pipeline completó todas las etapas:
- ✅ Tests unitarios
- ✅ Compilación y empaquetado
- ✅ Despliegue en testing
- ✅ Tests de integración
- ⏸️ Espera aprobación manual
- ✅ Despliegue en producción
- ✅ Eliminación del stack de testing

### ✅ Paso 10: Verificar Recursos en AWS

El stack `todo-app-prod` fue creado exitosamente en CloudFormation con status `CREATE_COMPLETE`.

### ✅ Paso 11: Probar la API

Probé todos los endpoints exitosamente:
- GET / → Obtener todos los items
- POST / → Crear un nuevo item
- GET /{id} → Obtener item específico

---

## 5. Pipeline Explicado

### Etapa 1: Tests (5-10 min)
Ejecuta tests unitarios para validar el código antes de compilar.

### Etapa 2: Build & Package (10-15 min)
Compila la aplicación con SAM y crea dos plantillas (testing y producción).

### Etapa 3: Deploy Testing (5-10 min)
Despliega en el stack `todo-app-dev` para pruebas.

### Etapa 4: Integration Test (3-5 min)
Prueba la API real contra endpoints de testing.

### Etapa 5: Manual Review
Espera aprobación manual de BeatrizGarc para continuar.

### Etapa 6: Deploy Production (5-10 min)
Despliega en el stack `todo-app-prod` para usuarios finales.

### Etapa 7: Cleanup (2-5 min)
Elimina automáticamente el stack de testing para ahorrar costos.

---

## 6. Ventajas de CI/CD Observadas

1. **Automatización**: Todo se ejecutó sin intervención (excepto aprobación final)
2. **Tests automáticos**: No necesité ejecutarlos manualmente
3. **Feedback rápido**: Supe en minutos si el código funcionaba
4. **Consistencia**: Mismo proceso cada vez
5. **Seguridad**: Credenciales guardadas de forma segura
6. **Control**: Aprobación manual previene despliegues accidentales

---

## 7. Conclusiones

### Lo Aprendido

- CI/CD es esencial en desarrollo moderno
- GitHub Actions es una herramienta potente
- SAM simplifica el desarrollo serverless
- Los tests son cruciales para la calidad
- Infrastructure as Code permite reproducibilidad

### Aplicaciones Prácticas

Estos conocimientos se pueden aplicar a:
- Proyectos profesionales reales
- Microservicios
- DevOps
- Startups que necesitan desplegar rápido

---

## 8. Referencias

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)

---

**Fin de la Memoria**

*Alumno/a: BeatrizGarc*  
*Fecha: Junio 2026*


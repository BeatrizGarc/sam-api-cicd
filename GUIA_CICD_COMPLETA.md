# Guía Completa: Despliegue de API REST con SAM y GitHub Actions

## Índice
1. [Requisitos Previos](#requisitos-previos)
2. [Paso 1: Crear Repositorio en GitHub](#paso-1-crear-repositorio-en-github)
3. [Paso 2: Preparar Archivos Locales](#paso-2-preparar-archivos-locales)
4. [Paso 3: Configurar GitHub Actions](#paso-3-configurar-github-actions)
5. [Paso 4: Ejecutar el Pipeline](#paso-4-ejecutar-el-pipeline)
6. [Paso 5: Aprobar Despliegue a Producción](#paso-5-aprobar-despliegue-a-producción)
7. [Paso 6: Probar la API](#paso-6-probar-la-api)
8. [Paso 7: Crear Memoria de la Práctica](#paso-7-crear-memoria-de-la-práctica)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta de GitHub activa
- ✅ Cuenta de AWS Academy activa (con credenciales válidas)
- ✅ Git instalado en tu máquina local
- ✅ Acceso a las credenciales del laboratorio AWS (Access Key ID, Secret Access Key, Session Token)
- ✅ Una copia de este repositorio descargada localmente

### Obtener Credenciales de AWS Academy

1. Accede a AWS Academy
2. Ve a **Learner Lab** 
3. Haz clic en **AWS** (el icono de AWS)
4. En la consola, ve a **AWS Details**
5. Haz clic en **Show** en la sección **Credentials** (CLI)
6. Copia los siguientes valores:
   - `aws_access_key_id`
   - `aws_secret_access_key`
   - `aws_session_token`

**Importante**: Estos tokens expiran. Nota la hora de expiración. Generalmente valen 4-6 horas desde que se crean.

---

## Paso 1: Crear Repositorio en GitHub

### 1.1 Crear el repositorio

1. Abre [GitHub](https://github.com)
2. Haz clic en el icono **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa los datos:
   - **Repository name**: `sam-api-cicd` (sin espacios, con guiones)
   - **Description**: `API REST con SAM, AWS Lambda y GitHub Actions CI/CD`
   - **Visibility**: Selecciona **Public** (recomendado para la práctica)
   - **Initialize repository**: Deja sin seleccionar (inicializaremos nosotros)
5. Haz clic en **"Create repository"**

### 1.2 Copiar la URL del repositorio

Después de crear el repositorio, GitHub te mostrará la URL HTTPS. Cópiala, se verá así:
```
https://github.com/tu-usuario/sam-api-cicd.git
```

---

## Paso 2: Preparar Archivos Locales

### 2.1 Crear estructura local

Abre una terminal/consola y ejecuta:

```bash
# Crear carpeta del proyecto
mkdir sam-api-cicd
cd sam-api-cicd

# Inicializar repositorio Git
git init
git config user.name "Tu Nombre"
git config user.email "tu.email@ejemplo.com"
```

### 2.2 Copiar archivos

Copia todos los archivos de la carpeta `./sesiones_7_8_sam_cicd/cicd/` a tu carpeta local `sam-api-cicd/`:

- `src/` (carpeta con los handlers)
- `__tests__/` (carpeta con los tests)
- `events/` (carpeta con eventos de prueba)
- `integracion/` (carpeta con tests de integración)
- `.gitignore`
- `package.json`
- `package-lock.json`
- `template.yaml`
- `cdk.json` (si existe)

**Estructura esperada después de copiar:**
```
sam-api-cicd/
├── src/
│   └── handlers/
│       ├── get-all-items.mjs
│       ├── get-by-id.mjs
│       └── put-item.mjs
├── __tests__/
│   └── unit/
│       └── handlers/
│           ├── get-all-items.test.mjs
│           ├── get-by-id.test.mjs
│           └── put-item.test.mjs
├── events/
│   ├── event-get-all-items.json
│   ├── event-get-by-id.json
│   └── event-post-item.json
├── integracion/
│   └── testapi.mjs
├── .gitignore
├── package.json
├── package-lock.json
└── template.yaml
```

### 2.3 Crear estructura `.github/workflows`

En tu carpeta `sam-api-cicd/`, crea la estructura:

```bash
mkdir -p .github/workflows
```

Copia el archivo `pipeline.yaml` desde `./sesiones_7_8_sam_cicd/cicd/pipeline.yaml` a `.github/workflows/pipeline.yaml`

**Estructura final:**
```
sam-api-cicd/
├── .github/
│   └── workflows/
│       └── pipeline.yaml
├── src/
├── __tests__/
├── events/
├── integracion/
├── .gitignore
├── package.json
├── package-lock.json
└── template.yaml
```

### 2.4 Primer commit

```bash
# Agregar todos los archivos
git add .

# Crear el commit inicial
git commit -m "Inicial: API REST con SAM y GitHub Actions"

# Añadir el repositorio remoto
git remote add origin https://github.com/tu-usuario/sam-api-cicd.git

# Cambiar rama a 'main' (por compatibilidad con GitHub)
git branch -M main

# Subir los cambios
git push -u origin main
```

Si todo funciona correctamente, verás los archivos en tu repositorio de GitHub.

---

## Paso 3: Configurar GitHub Actions

### 3.1 Configurar los secretos

Los secretos son credenciales encriptadas que GitHub Actions usa para desplegar en AWS.

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings**
3. En el menú izquierdo, selecciona **Secrets and variables** → **Actions**
4. Haz clic en **"New repository secret"**

Crea los siguientes tres secretos:

#### Secreto 1: AWS_ACCESS_KEY_ID
- **Name**: `AWS_ACCESS_KEY_ID`
- **Value**: Tu `aws_access_key_id` de AWS Academy (obtenido en los requisitos previos)
- Haz clic en **"Add secret"**

#### Secreto 2: AWS_SECRET_ACCESS_KEY
- **Name**: `AWS_SECRET_ACCESS_KEY`
- **Value**: Tu `aws_secret_access_key` de AWS Academy
- Haz clic en **"Add secret"**

#### Secreto 3: AWS_SESSION_TOKEN
- **Name**: `AWS_SESSION_TOKEN`
- **Value**: Tu `aws_session_token` de AWS Academy
- Haz clic en **"Add secret"**

**Captura esperada**: Una tabla mostrando los tres secretos (sin revelar sus valores)

```
Last updated less than a minute ago

AWS_ACCESS_KEY_ID        Actions    Delete
AWS_SECRET_ACCESS_KEY    Actions    Delete
AWS_SESSION_TOKEN        Actions    Delete
```

### 3.2 Crear un Entorno (Environment)

Los entornos permiten configurar protecciones, como aprobación manual antes de desplegar.

1. En tu repositorio, ve a **Settings**
2. En el menú izquierdo, haz clic en **Environments**
3. Haz clic en **"New environment"**
4. **Environment name**: `testenv`
5. Haz clic en **"Configure environment"**
6. En la sección **Deployment branches**, asegúrate de que permita despliegues desde `main`
7. En **Protection rules**, activa:
   - **"Require reviewers"** ✅
8. En **Select reviewers**, puedes agregar tu usuario u otros revisores (o dejar en blanco)
9. Haz clic en **"Save protection rules"**

**Resultado**: Ahora, cuando el pipeline intente desplegar a producción, GitHub te pedirá aprobación manual.

---

## Paso 4: Ejecutar el Pipeline

### 4.1 Realizar un cambio en el código

Para disparar el pipeline, necesitamos hacer un push a la rama `main`.

1. En tu carpeta local, abre cualquier archivo de los handlers, por ejemplo:
   ```
   sam-api-cicd/src/handlers/get-all-items.mjs
   ```

2. Realiza un cambio menor (por ejemplo, añade un comentario):
   ```javascript
   // Versión mejorada - actualizada en GitHub Actions
   ```

3. Guarda el archivo

4. Realiza un commit y push:
   ```bash
   git add src/handlers/get-all-items.mjs
   git commit -m "Actualizar handler get-all-items"
   git push
   ```

### 4.2 Monitorear la ejecución

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **"Actions"**
3. Verás un workflow en ejecución con el nombre del último commit

#### Etapas del Pipeline

El pipeline ejecutará las siguientes etapas en orden:

##### 1️⃣ **test** (5-10 minutos)
- Clona el repositorio
- Instala dependencias
- Ejecuta tests unitarios
- **Estado esperado**: ✅ Exitoso

##### 2️⃣ **build-and-package** (10-15 minutos)
- Compila la aplicación con SAM
- Empaqueta para testing y producción
- Almacena las plantillas compiladas
- **Estado esperado**: ✅ Exitoso

##### 3️⃣ **deploy-testing** (5-10 minutos)
- Configura credenciales AWS
- Despliega la aplicación en el stack `todo-app-dev`
- Obtiene la URL de la API
- **Estado esperado**: ✅ Exitoso

##### 4️⃣ **integration-test** (3-5 minutos)
- Ejecuta tests de integración contra el API
- Prueba los endpoints reales en AWS
- **Estado esperado**: ✅ Exitoso o con fallos esperados (si la tabla está vacía)

##### 5️⃣ **deploy-prod** (⏸️ ESPERANDO APROBACIÓN)
- **Estado**: ⏸️ ESPERANDO REVISIÓN MANUAL
- **Tu acción**: Necesitas aprobar manualmente

**Captura importante**: Toma una captura cuando veas el estado "waiting for review"

### 4.3 Observar los logs

Para ver más detalles del pipeline:

1. Haz clic en el job que desees (por ejemplo, "test")
2. Verás los logs de cada paso
3. Busca mensajes de error o éxito

**Caso de éxito esperado:**
```
✓ Tests unitarios completados
✓ Compilación completada
✓ Empaquetado completado
✓ Despliegue en testing completado
✓ Tests de integración completados
```

---

## Paso 5: Aprobar Despliegue a Producción

### 5.1 Acceder a la revisión

1. En GitHub, ve a **Actions**
2. Haz clic en el workflow que está en ejecución
3. Desplázate hacia abajo hasta encontrar el paso **deploy-prod**
4. Verás un banner que dice **"This job is waiting for your review"**

### 5.2 Revisar y aprobar

1. Haz clic en el botón **"Review deployments"** (o similar)
2. Se abrirá un diálogo con:
   - **Environments**: `testenv` (seleccionado)
   - **Approve and deploy**: botón verde
3. Opcionalmente, puedes añadir un comentario (ej: "Aprobado para pasar a producción")
4. Haz clic en **"Approve and deploy"**

**Captura importante**: Toma una captura del diálogo de aprobación

### 5.3 Verificar el despliegue en producción

Una vez aprobado, el pipeline continuará:

1. Se desplegará la aplicación en el stack `todo-app-prod`
2. Se ejecutará el comando para eliminar el stack de testing (`todo-app-dev`)
3. Verás el pipeline completarse con todas las etapas en verde ✅

**Resultado en AWS:**
- En **CloudFormation**, verás:
  - `todo-app-prod`: CREATE_COMPLETE (nuevo)
  - `todo-app-dev`: DELETE_COMPLETE (eliminado)

---

## Paso 6: Probar la API

### 6.1 Obtener la URL de la API

**En GitHub Actions:**
1. Ve a **Actions** → Tu último workflow exitoso
2. Busca el step "Obtener URL de la API desplegada"
3. En los logs, verás una URL similar a:
   ```
   https://xxxxxx.execute-api.us-east-1.amazonaws.com/Prod/
   ```

**En AWS CloudFormation:**
1. Ve a **CloudFormation**
2. Selecciona el stack `todo-app-prod`
3. Ve a la pestaña **Outputs**
4. Copia el valor de **WebEndpoint**

### 6.2 Probar los endpoints

Usa `curl` o Postman para probar:

#### 1. Obtener todos los items (GET)
```bash
curl https://xxxxxx.execute-api.us-east-1.amazonaws.com/Prod/
```

**Respuesta esperada:**
```json
{
  "message": "hello world",
  "Items": []
}
```

#### 2. Crear un item (POST)
```bash
curl -X POST https://xxxxxx.execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"Mi primer item"}'
```

**Respuesta esperada:**
```json
{
  "message": "Item creado exitosamente"
}
```

#### 3. Obtener un item específico (GET /{id})
```bash
curl https://xxxxxx.execute-api.us-east-1.amazonaws.com/Prod/1
```

**Respuesta esperada:**
```json
{
  "message": "Item encontrado",
  "Item": {
    "id": "1",
    "name": "Mi primer item"
  }
}
```

### 6.3 Crear un cliente web (Opcional)

Consulta [EJERCICIOS_OPCIONALES.md](./EJERCICIOS_OPCIONALES.md) para instrucciones sobre cómo crear un frontend web que consuma la API.

---

## Paso 7: Crear Memoria de la Práctica

Crea un documento (PDF o Markdown) que incluya:

### 7.1 Estructura de la Memoria

```
# Práctica: Despliegue de API REST con SAM y GitHub Actions CI/CD

## 1. Portada
- Título del proyecto
- Tu nombre/grupo
- Fecha
- URL del repositorio de GitHub

## 2. Índice
- Tabla de contenidos

## 3. Introducción
- Explicar qué es CI/CD
- Por qué es importante en desarrollo de software
- Ventajas de automatizar despliegues
- Referencias: 3-5 párrafos

## 4. Objetivos
- Objetivo general
- Objetivos específicos
- Listado de 4-6 objetivos

## 5. Arquitectura
- Diagrama de la arquitectura (GitHub Actions → AWS)
- Explicar cada componente
- Flujo de datos

Ejemplo:
```
GitHub Repository
        ↓ (push)
GitHub Actions
        ↓
  1. Tests
  2. Build
  3. Deploy a Testing
  4. Integration Tests
  5. Manual Review
  6. Deploy a Prod
        ↓
     AWS (Lambda, API Gateway, DynamoDB)
```

## 6. Pasos Realizados

Para cada paso principal, incluir:

### Paso 1: Crear Repositorio en GitHub
- **Descripción**: Qué se hizo
- **Captura**: Imagen del repositorio creado
- **Resultado**: Confirmación de éxito

### Paso 2: Configurar Secretos
- **Descripción**: Qué secretos se configuraron y por qué
- **Captura**: Tabla de secretos en GitHub
- **Notas**: Cuidados sobre sensibilidad de credenciales

### Paso 3: Crear Entorno
- **Descripción**: Qué es un entorno y para qué sirve
- **Captura**: Configuración del entorno `testenv`
- **Explicación**: Por qué se requiere aprobación manual

### Paso 4: Ejecutar Pipeline
- **Descripción**: Cómo se dispara el pipeline
- **Capturas**: 
  - Workflow en ejecución
  - Cada etapa completada (test, build, deploy-testing, integration-test)
  - Pipeline waiting for review
- **Tiempos**: Cuánto tardó cada etapa

### Paso 5: Aprobar Despliegue
- **Descripción**: Proceso de aprobación manual
- **Captura**: Diálogo de aprobación
- **Captura**: Pipeline completado con todas las etapas en verde

### Paso 6: Verificar en AWS
- **Descripción**: Qué recursos se crearon en AWS
- **Capturas**:
  - CloudFormation mostrando stacks
  - Lambda functions creadas
  - API Gateway endpoints
  - DynamoDB table
- **Notas**: Cambios entre testing y producción

### Paso 7: Probar API
- **Descripción**: Tests realizados
- **Capturas**:
  - Curl o Postman probando endpoints
  - Respuestas de la API
  - Cliente web (si se implementó)

## 7. Pipeline de CI/CD

Explicar cada etapa del pipeline:

### Etapa 1: Tests
- Descripción: Tests unitarios
- Duración esperada
- Qué hace

### Etapa 2: Build & Package
- Descripción: Compilación y empaquetado con SAM
- Duración esperada
- Artefactos generados

### Etapa 3: Deploy Testing
- Descripción: Despliegue en entorno de pruebas
- Stack name: `todo-app-dev`
- Región: `us-east-1`
- Duración esperada

### Etapa 4: Integration Tests
- Descripción: Tests contra la API real
- Qué se prueba

### Etapa 5: Deploy Producción
- Descripción: Despliegue en producción (requiere aprobación)
- Stack name: `todo-app-prod`
- Duración esperada
- Limpieza: Se elimina el stack de testing

## 8. Recursos Creados

Documentar los recursos creados en AWS:

- **Lambda Functions**: `getAllItemsFunction`, `getByIdFunction`, `putItemFunction`
- **API Gateway**: Endpoints disponibles
- **DynamoDB Table**: Estructura y atributos
- **IAM Roles**: Permisos asignados
- **CloudFormation**: Stacks creados

Tabla con detalles:

| Recurso | Nombre | Tipo | Estado |
|---------|--------|------|--------|
| getAllItemsFunction | todo-app-dev-getAllItemsFunction | Lambda | ACTIVE |
| getByIdFunction | todo-app-dev-getByIdFunction | Lambda | ACTIVE |
| putItemFunction | todo-app-dev-putItemFunction | Lambda | ACTIVE |
| SampleTable | todo-app-dev-SampleTable | DynamoDB | ACTIVE |
| API | [URL] | API Gateway | ACTIVE |

## 9. Pruebas Realizadas

### Test 1: GET /
- **Objetivo**: Obtener todos los items
- **Comando**: `curl https://...`
- **Respuesta**: [Captura]
- **Resultado**: ✅ Exitoso

### Test 2: POST /
- **Objetivo**: Crear un nuevo item
- **Comando**: `curl -X POST ...`
- **Datos**: JSON enviado
- **Respuesta**: [Captura]
- **Resultado**: ✅ Exitoso

### Test 3: GET /{id}
- **Objetivo**: Obtener un item específico
- **Comando**: `curl https://.../{id}`
- **Respuesta**: [Captura]
- **Resultado**: ✅ Exitoso

## 10. Ventajas de CI/CD

Reflexión sobre las ventajas observadas:
- Automatización del despliegue
- Reducción de errores manuales
- Feedback rápido del pipeline
- Entornos aislados para pruebas
- Aprobación manual antes de producción
- Facilidad para deshacer cambios
- Trazabilidad de cambios

## 11. Problemas Encontrados y Soluciones

Documentar cualquier problema:

| Problema | Síntoma | Solución |
|----------|---------|----------|
| Token expirado | Pipeline falla en configuración AWS | Renovar secretos con nuevos tokens |
| Permisos insuficientes | Falla en creación de recursos | Verificar rol LabRole en AWS |
| [Otro problema] | [Síntoma] | [Solución] |

## 12. Conclusiones

- Resumen de lo aprendido
- Importancia de CI/CD en desarrollo moderno
- Aplicaciones prácticas
- Futuras mejoras
- 3-5 párrafos

## 13. Anexos

- Links útiles
- Comandos referencia
- Screenshots adicionales
- Código modificado (si aplica)

## 14. Referencias

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/)
- Otros recursos utilizados
```

### 7.2 Capturas Recomendadas

A lo largo del documento, incluir capturas de:

1. ✅ Repositorio GitHub creado
2. ✅ Secrets configurados
3. ✅ Entorno `testenv` creado
4. ✅ Archivo `pipeline.yaml` en `.github/workflows/`
5. ✅ Workflow ejecutándose (todas las etapas)
6. ✅ Workflow waiting for review
7. ✅ Diálogo de aprobación
8. ✅ Workflow completado (todas las etapas en verde)
9. ✅ CloudFormation mostrando stacks
10. ✅ Lambda functions en AWS
11. ✅ API Gateway endpoints
12. ✅ DynamoDB table
13. ✅ Tests curl/Postman exitosos
14. ✅ Cliente web funcionando (opcional)

---

## Checklist de Finalización

- ✅ Repositorio GitHub creado y público
- ✅ Archivos subidos correctamente
- ✅ `.github/workflows/pipeline.yaml` en lugar correcto
- ✅ Tres secretos configurados (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN)
- ✅ Entorno `testenv` creado con aprobación manual
- ✅ Pipeline ejecutado exitosamente
- ✅ Despliegue aprobado manualmente
- ✅ API testeada en testing
- ✅ API testeada en producción
- ✅ Stack de testing eliminado automáticamente
- ✅ Stack de producción activo
- ✅ Memoria/informe completado

---

## Recursos Adicionales

- **AWS SAM**: https://docs.aws.amazon.com/serverless-application-model/
- **GitHub Actions**: https://docs.github.com/en/actions
- **AWS Lambda**: https://docs.aws.amazon.com/lambda/
- **API Gateway**: https://docs.aws.amazon.com/apigateway/
- **DynamoDB**: https://docs.aws.amazon.com/dynamodb/
- **CloudFormation**: https://docs.aws.amazon.com/cloudformation/

---

**Última actualización**: Junio 2026

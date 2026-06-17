# Plantilla: Memoria de Práctica CI/CD con SAM y GitHub Actions

> Utiliza esta plantilla como base para crear tu memoria. Reemplaza los `[corchetes]` con tu contenido específico.

---

## Portada

```
PRÁCTICA: Despliegue de API REST con SAM y GitHub Actions CI/CD

Asignatura: [Tu asignatura]
Curso: [Tu curso]
Alumno/a: [Tu nombre]
Grupo: [Tu grupo, si aplica]
Fecha: [dd/mm/yyyy]

Repositorio: https://github.com/[tu-usuario]/[tu-repositorio]

Centro: [Tu centro educativo]
```

---

## 1. Introducción

### 1.1 ¿Qué es CI/CD?

CI/CD (Integración Continua / Entrega Continua) es una práctica de desarrollo de software que automatiza:

- **Integración Continua (CI)**: Los desarrolladores integran su código con frecuencia, múltiples veces al día
- **Entrega Continua (CD)**: El código se despliega automáticamente a entornos de producción después de pasar tests

### 1.2 Importancia en Desarrollo Moderno

En proyectos modernos, CI/CD es fundamental porque:
- Reduce errores manuales en despliegues
- Acelera el time-to-market (tiempo para llegar al mercado)
- Permite feedback inmediato sobre la calidad del código
- Facilita la detección de problemas tempranos

### 1.3 Objetivo de la Práctica

El objetivo es aprender a:
- Crear pipelines de CI/CD con GitHub Actions
- Desplegar aplicaciones serverless con AWS SAM
- Implementar tests unitarios e integración
- Automatizar despliegues en múltiples entornos
- Requerir aprobación manual antes de producción

---

## 2. Descripción de la Arquitectura

### 2.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        GitHub Repository                     │
│  - Código fuente                                             │
│  - Pipeline configuration (.github/workflows/pipeline.yaml)  │
└────────────────────┬────────────────────────────────────────┘
                     │ (push a main)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions                            │
│  1. Test (tests unitarios)                                  │
│  2. Build & Package (SAM build + package)                   │
│  3. Deploy Testing (CloudFormation stack)                   │
│  4. Integration Test (tests contra API real)                │
│  5. Manual Review (aprobación manual)                       │
│  6. Deploy Production (CloudFormation stack)                │
│  7. Cleanup (eliminar stack de testing)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   ┌─────────────┐          ┌─────────────┐
   │ AWS Testing │          │  AWS Prod   │
   │             │          │             │
   │ Stack:      │          │ Stack:      │
   │ todo-app-dev│          │ todo-app-prod
   │             │          │             │
   │ - Lambda    │          │ - Lambda    │
   │ - API GW    │  (aprob) │ - API GW    │
   │ - DynamoDB  │   →      │ - DynamoDB  │
   │             │          │             │
   │[Eliminado]  │          │ [Activo]    │
   └─────────────┘          └─────────────┘
```

### 2.2 Componentes

#### GitHub Actions
- **Orquestador**: Ejecuta los pasos del pipeline automáticamente
- **Triggers**: Se activa con push a la rama `main`
- **Jobs**: Ejecución en paralelo o secuencial según dependencias

#### AWS SAM (Serverless Application Model)
- **Framework**: Simplifica la creación de aplicaciones serverless
- **CloudFormation**: Despliega infraestructura como código
- **Recursos**: Lambda, API Gateway, DynamoDB

#### AWS Lambda
- **Funciones**: `getAllItemsFunction`, `getByIdFunction`, `putItemFunction`
- **Runtime**: Node.js 18.x
- **Rol**: LabRole (credenciales del laboratorio)

#### API Gateway
- **Punto de entrada**: HTTPS endpoint público
- **CORS**: Habilitado para consumir desde navegadores
- **Métodos**: GET, POST

#### DynamoDB
- **Base de datos**: NoSQL serverless
- **Tabla**: `SampleTable`
- **Clave**: Atributo `id` (String)

---

## 3. Pasos Realizados

### Paso 1: Crear Repositorio en GitHub

**Descripción**: Se creó un nuevo repositorio público en GitHub para albergar el código y la configuración del pipeline.

**Acciones realizadas**:
1. Navegué a https://github.com/new
2. Complété los datos:
   - Repository name: `[tu-repositorio]`
   - Description: `API REST con SAM y GitHub Actions`
   - Visibility: Public
3. Hice clic en "Create repository"

**Captura**: [Aquí inserta una captura del repositorio creado]

**Resultado**: ✅ Repositorio creado exitosamente en: https://github.com/[tu-usuario]/[tu-repositorio]

---

### Paso 2: Preparar Archivos Locales

**Descripción**: Copié los archivos de la aplicación SAM a la máquina local y los preparé para subir a GitHub.

**Estructura creada**:
```
sam-api-cicd/
├── .github/
│   └── workflows/
│       └── pipeline.yaml
├── src/
│   └── handlers/
│       ├── get-all-items.mjs
│       ├── get-by-id.mjs
│       └── put-item.mjs
├── __tests__/
├── events/
├── integracion/
├── .gitignore
├── package.json
└── template.yaml
```

**Captura**: [Captura del árbol de directorios en terminal]

**Resultado**: ✅ Estructura lista para subir a GitHub

---

### Paso 3: Configurar Secretos en GitHub

**Descripción**: Configuré los secretos (credenciales de AWS) que GitHub Actions necesita para desplegar.

**Secretos configurados**:
1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_SESSION_TOKEN`

**Instrucciones seguidas**:
1. Fui a Settings → Secrets and variables → Actions
2. Hice clic en "New repository secret"
3. Añadí los tres secretos con mis credenciales de AWS Academy

**Captura**: [Captura mostrando los tres secretos en GitHub]

**Nota importante**: Los tokens de AWS Academy expiran cada 4-6 horas. Si el pipeline falla después de este tiempo, necesitarás renovar los secretos con nuevos tokens.

**Resultado**: ✅ Secretos configurados correctamente

---

### Paso 4: Crear Entorno con Aprobación Manual

**Descripción**: Creé un entorno llamado `testenv` que requiere aprobación manual antes de desplegar a producción.

**Configuración**:
1. Fui a Settings → Environments
2. Hice clic en "New environment"
3. Nombre: `testenv`
4. Activé "Require reviewers"
5. Guardé la configuración

**Captura**: [Captura del entorno creado]

**Por qué es importante**: Previene despliegues accidentales a producción. Todo cambio debe ser revisado antes de llegar a usuarios finales.

**Resultado**: ✅ Entorno creado con protecciones activadas

---

### Paso 5: Primer Push y Ejecución del Pipeline

**Descripción**: Realicé un cambio en el código, hice commit y push para disparar el pipeline.

**Cambio realizado**: Actualicé el archivo `src/handlers/get-all-items.mjs` con un comentario.

**Comandos ejecutados**:
```bash
git add .
git commit -m "Actualizar get-all-items handler"
git push
```

**Captura**: [Captura del terminal mostrando el push]

**Resultado**: ✅ Push realizado, pipeline iniciado

---

### Paso 6: Monitorear Pipeline en GitHub Actions

**Descripción**: Observé la ejecución del pipeline a través de GitHub Actions, viendo cada etapa completarse.

**Etapas ejecutadas**:

| Etapa | Estado | Duración | Descripción |
|-------|--------|----------|-------------|
| test | ✅ Exitoso | [tiempo] | Tests unitarios ejecutados |
| build-and-package | ✅ Exitoso | [tiempo] | Compilación y empaquetado con SAM |
| deploy-testing | ✅ Exitoso | [tiempo] | Despliegue en stack `todo-app-dev` |
| integration-test | ✅ Exitoso | [tiempo] | Tests contra la API de testing |
| deploy-prod | ⏸️ En espera | - | Aguardando aprobación manual |

**Capturas**:
- [Captura mostrando el workflow en ejecución]
- [Captura de cada etapa completada]
- [Captura del estado "waiting for review"]

**Resultado**: ✅ Pipeline ejecutándose correctamente hasta punto de aprobación

---

### Paso 7: Aprobar Despliegue a Producción

**Descripción**: Proporcioné aprobación manual para desplegar a producción.

**Proceso**:
1. Fui a Actions
2. Seleccioné el workflow en espera
3. Busqué el paso "deploy-prod"
4. Hice clic en "Review deployments"
5. Seleccioné el entorno `testenv`
6. Hice clic en "Approve and deploy"

**Captura**: [Captura del diálogo de aprobación]

**Resultado**: ✅ Despliegue a producción iniciado

---

### Paso 8: Verificar Despliegue en Producción

**Descripción**: Verifiqué que el despliegue a producción se completó correctamente y que el stack de testing fue eliminado.

**Verificación en AWS CloudFormation**:
1. Accedí a AWS CloudFormation
2. Vi dos stacks:
   - `todo-app-dev`: DELETE_COMPLETE (eliminado)
   - `todo-app-prod`: CREATE_COMPLETE (activo)

**Capturas**:
- [Captura de CloudFormation mostrando ambos stacks]
- [Captura detallada del stack de producción]
- [Captura de los recursos creados (Lambda, API Gateway, DynamoDB)]

**Resultado**: ✅ Despliegue a producción completado exitosamente

---

### Paso 9: Probar la API

**Descripción**: Probé todos los endpoints de la API, tanto en testing como en producción.

#### Test 1: GET / (Obtener todos los items)

**URL**: `https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/`

**Comando**:
```bash
curl https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/
```

**Respuesta**:
```json
{
  "message": "hello world",
  "Items": []
}
```

**Captura**: [Captura de la respuesta exitosa]

**Resultado**: ✅ Endpoint GET / funciona correctamente

#### Test 2: POST / (Crear un item)

**URL**: `https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/`

**Comando**:
```bash
curl -X POST https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"Item de prueba"}'
```

**Respuesta**:
```json
{
  "message": "Item creado exitosamente"
}
```

**Captura**: [Captura de la respuesta exitosa]

**Resultado**: ✅ Endpoint POST / funciona correctamente

#### Test 3: GET /{id} (Obtener un item específico)

**URL**: `https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/1`

**Comando**:
```bash
curl https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/1
```

**Respuesta**:
```json
{
  "message": "Item encontrado",
  "Item": {
    "id": "1",
    "name": "Item de prueba"
  }
}
```

**Captura**: [Captura de la respuesta exitosa]

**Resultado**: ✅ Endpoint GET /{id} funciona correctamente

---

## 4. Pipeline de CI/CD - Análisis Detallado

### 4.1 Etapa 1: Tests

**Propósito**: Validar que el código sea correcto antes de compilar.

**Duración esperada**: 5-10 minutos

**Pasos**:
1. Clona el repositorio
2. Instala dependencias (`npm install`)
3. Ejecuta tests unitarios (`npm run test`)

**Salida esperada**: Todos los tests pasan ✅

**Importancia**: Detecta errores temprano, antes de gastar recursos compilando.

---

### 4.2 Etapa 2: Build & Package

**Propósito**: Compilar la aplicación y empaquetarla para desplegar en AWS.

**Duración esperada**: 10-15 minutos

**Pasos**:
1. Elimina archivos de test innecesarios
2. Instala dependencias de producción (`npm prune --production`)
3. Instala SAM CLI
4. Compila la aplicación (`sam build`)
5. Configura credenciales AWS
6. Empaqueta para testing (`sam package`)
7. Empaqueta para producción (`sam package`)
8. Almacena los artefactos para etapas posteriores

**Salida esperada**: Dos archivos YAML compilados:
- `packaged-testing.yaml`
- `packaged-prod.yaml`

**Importancia**: Prepara la aplicación para desplegar. Los artefactos se usan en las etapas siguientes.

---

### 4.3 Etapa 3: Deploy Testing

**Propósito**: Desplegar la aplicación en un entorno de pruebas aislado.

**Duración esperada**: 5-10 minutos

**Stack name**: `todo-app-dev`

**Región**: `us-east-1`

**Recursos creados**:
- 3 Lambda functions
- 1 API Gateway
- 1 DynamoDB table

**Salida esperada**: 
- Stack en estado CREATE_COMPLETE
- URL de la API disponible para testing

**Importancia**: Permite probar la aplicación sin afectar producción.

---

### 4.4 Etapa 4: Integration Tests

**Propósito**: Probar la aplicación real en AWS contra la API de testing.

**Duración esperada**: 3-5 minutos

**Qué se prueba**:
1. Conectividad a la API
2. Endpoints disponibles
3. Respuestas correctas
4. Códigos HTTP esperados

**Script de prueba**: `integracion/testapi.mjs`

**Salida esperada**: Todos los tests pasan ✅

**Importancia**: Valida que la aplicación funciona correctamente en AWS antes de pasar a producción.

---

### 4.5 Etapa 5: Manual Review

**Propósito**: Requerir aprobación humana antes de desplegar a producción.

**Duración**: Variable (espera tu decisión)

**Protecciones**:
- Entorno configurado: `testenv`
- Requiere revisores: Sí

**Por qué es importante**: Previene despliegues accidentales. Un humano revisa antes de que cambios lleguen a usuarios.

---

### 4.6 Etapa 6: Deploy Production

**Propósito**: Desplegar la aplicación a producción después de aprobación.

**Duración esperada**: 5-10 minutos

**Stack name**: `todo-app-prod`

**Región**: `us-east-1`

**Diferencias con testing**:
- Mismo código
- Mismo nombre de stack (prod en lugar de dev)
- Posiblemente diferentes capacidades/réplicas (en aplicaciones reales)

**Salida esperada**: 
- Stack en estado CREATE_COMPLETE
- URL de la API de producción disponible

**Importancia**: Hace que los cambios estén disponibles para usuarios finales.

---

### 4.7 Etapa 7: Cleanup

**Propósito**: Limpiar recursos innecesarios.

**Duración esperada**: 2-5 minutos

**Acciones**:
1. Elimina el stack de testing (`todo-app-dev`)
2. Mantiene el stack de producción (`todo-app-prod`)

**Salida esperada**: Stack de testing en estado DELETE_COMPLETE

**Importancia**: Ahorra costos eliminando infraestructura que ya no se necesita.

---

## 5. Recursos Creados en AWS

### 5.1 Lambda Functions

| Nombre | Handler | Método | Path | Descripción |
|--------|---------|--------|------|-------------|
| getAllItemsFunction | get-all-items.mjs | GET | / | Obtiene todos los items |
| getByIdFunction | get-by-id.mjs | GET | /{id} | Obtiene un item por ID |
| putItemFunction | put-item.mjs | POST | / | Crea un nuevo item |

Cada función:
- Runtime: Node.js 18.x
- Memory: 128 MB
- Timeout: 100 segundos
- Rol: LabRole

### 5.2 API Gateway

- **Type**: REST API
- **Endpoint**: `https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/`
- **CORS**: Habilitado
- **Métodos**: GET, POST, OPTIONS

### 5.3 DynamoDB

- **Tabla**: SampleTable
- **Clave primaria**: `id` (String)
- **Capacidad**: 2 unidades de lectura, 2 de escritura
- **Estado**: ACTIVE

### 5.4 CloudFormation

**Stack Testing**:
```
Stack Name: todo-app-dev
Status: DELETE_COMPLETE (eliminado)
Region: us-east-1
```

**Stack Production**:
```
Stack Name: todo-app-prod
Status: CREATE_COMPLETE
Region: us-east-1
Outputs:
  - WebEndpoint: https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/
  - DynamoDBTable: arn:aws:dynamodb:us-east-1:[account-id]:table/SampleTable
```

---

## 6. Ventajas Observadas de CI/CD

1. **Automatización**: Los despliegues se automatizan sin intervención manual
2. **Velocidad**: Los cambios llegan a producción en minutos, no en días
3. **Confiabilidad**: Los tests se ejecutan automáticamente, previniendo errores
4. **Trazabilidad**: Cada cambio es rastreable en Git
5. **Seguridad**: Requiere aprobación manual antes de producción
6. **Escalabilidad**: El pipeline se puede escalar a múltiples entornos
7. **Feedback**: Obtienes feedback inmediato sobre la calidad del código

---

## 7. Problemas Encontrados y Soluciones

| Problema | Síntoma | Solución |
|----------|---------|----------|
| Token expirado | Pipeline falla con "Unauthorized" | Renovar secretos en GitHub con nuevos tokens de AWS |
| Permisos insuficientes | CloudFormation falla con "AccessDenied" | Verificar que LabRole tiene permisos necesarios |
| Stack ya existe | Deploy falla | Eliminar stack manual antes de reintentar, o usar `--no-fail-on-empty-changeset` |
| Tests fallan | Pipeline se detiene en etapa "test" | Revisar logs de tests y corregir código |
| API no responde | Integration tests fallan | Esperar a que Lambda se inicie, reintentar o revisar logs |

---

## 8. Conclusiones

### 8.1 Aprendizajes Principales

Esta práctica permitió aprender:

1. **CI/CD es fundamental**: Automatizar despliegues reduce errores y acelera desarrollo
2. **GitHub Actions es potente**: Permite crear pipelines complejos sin herramientas externas
3. **SAM simplifica serverless**: Abstraer CloudFormation facilita crear aplicaciones serverless
4. **Testing es crucial**: Validar código antes de producción previene problemas
5. **Aprobación manual es importante**: Un paso de revisión previene despliegues accidentales

### 8.2 Aplicaciones Prácticas

Los conocimientos adquiridos se pueden aplicar a:

- Proyectos profesionales con despliegues frecuentes
- Aplicaciones serverless en la nube
- Automatización de procesos repetitivos
- Mejora de calidad de software

### 8.3 Recomendaciones Futuras

Para mejorar en el futuro:

1. Añadir más tests (coverage > 80%)
2. Implementar monitorización y alertas
3. Usar múltiples entornos (dev, staging, prod)
4. Implementar rollback automático
5. Documentar API con OpenAPI/Swagger

---

## 9. Anexos

### 9.1 Comandos Utilizados

```bash
# Inicializar repositorio
git init
git remote add origin https://github.com/[usuario]/[repo].git

# Preparar y subir cambios
git add .
git commit -m "Mensaje"
git push -u origin main

# Clonar repositorio
git clone https://github.com/[usuario]/[repo].git

# Probar API con curl
curl https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/
curl -X POST https://[api-id].execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"Item"}'
```

### 9.2 URLs Utilizadas

- Repositorio: https://github.com/[usuario]/[repo]
- API Testing: https://[api-id-test].execute-api.us-east-1.amazonaws.com/Prod/
- API Production: https://[api-id-prod].execute-api.us-east-1.amazonaws.com/Prod/

### 9.3 Archivos Modificados

- `.github/workflows/pipeline.yaml` - Pipeline CI/CD
- `src/handlers/get-all-items.mjs` - [Cambio realizado]
- [Otros archivos modificados]

---

## 10. Referencias

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/)
- [AWS API Gateway](https://docs.aws.amazon.com/apigateway/)
- [AWS DynamoDB](https://docs.aws.amazon.com/dynamodb/)
- [CloudFormation](https://docs.aws.amazon.com/cloudformation/)

---

**Fin de la Plantilla**

*Esta plantilla está diseñada para ser flexible. Puedes añadir, eliminar o modificar secciones según tus necesidades.*

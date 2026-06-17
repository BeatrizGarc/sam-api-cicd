# Referencia Rápida: Cheat Sheet de Comandos y URLs

Guarda esta página de referencia para acceder rápidamente a comandos, URLs y configuraciones comunes.

---

## 🎯 URLs Importantes

### GitHub
```
Crear repo:        https://github.com/new
Actions:           https://github.com/[usuario]/[repo]/actions
Settings:          https://github.com/[usuario]/[repo]/settings
Secrets:           https://github.com/[usuario]/[repo]/settings/secrets/actions
Environments:      https://github.com/[usuario]/[repo]/settings/environments
```

### AWS
```
AWS Console:       https://console.aws.amazon.com
CloudFormation:    https://console.aws.amazon.com/cloudformation
Lambda:            https://console.aws.amazon.com/lambda
API Gateway:       https://console.aws.amazon.com/apigateway
DynamoDB:          https://console.aws.amazon.com/dynamodb
CloudWatch Logs:   https://console.aws.amazon.com/logs
```

### AWS Academy
```
Learner Lab:       https://awsacademy.instructure.com
AWS Details:       Click "AWS Details" en Learner Lab
Credentials:       Click "Show" en la sección Credentials (CLI)
```

---

## 🔐 Configuración de Secretos

### En GitHub Actions (Settings → Secrets → Actions)

```
Nombre: AWS_ACCESS_KEY_ID
Valor: [Tu AWS_ACCESS_KEY_ID]

Nombre: AWS_SECRET_ACCESS_KEY
Valor: [Tu AWS_SECRET_ACCESS_KEY]

Nombre: AWS_SESSION_TOKEN
Valor: [Tu AWS_SESSION_TOKEN]
```

### En pipeline.yaml (no modificar)

```yaml
aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
aws-session-token: ${{ secrets.AWS_SESSION_TOKEN }}
```

---

## 🚀 Comandos Git Esenciales

### Configuración Inicial

```bash
# Configurar usuario
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar configuración
git config --list
```

### Trabajo Básico

```bash
# Crear repositorio local
git init

# Clonar un repositorio
git clone https://github.com/usuario/repo.git

# Ver estado
git status

# Agregar cambios
git add .                    # Todos los cambios
git add archivo.txt          # Un archivo específico

# Crear commit
git commit -m "Descripción del cambio"

# Subir cambios
git push                     # Push a rama actual
git push -u origin main      # Primer push a rama main

# Descargar cambios
git pull

# Ver histórico
git log                      # Últimos commits
git log --oneline           # Resumen corto
```

### Ramas

```bash
# Crear rama
git branch mi-rama

# Cambiar de rama
git checkout mi-rama

# Crear y cambiar en un comando
git checkout -b mi-rama

# Eliminar rama local
git branch -d mi-rama

# Renombrar rama a main
git branch -M main
```

---

## 📦 Comandos SAM

### Instalación y Configuración

```bash
# Instalar SAM CLI
# macOS: brew install aws-sam-cli
# Windows: Usar instalador de AWS
# Linux: pip install aws-sam-cli

# Verificar instalación
sam --version
```

### Desarrollo Local

```bash
# Inicializar nuevo proyecto
sam init

# Construir aplicación
sam build

# Ejecutar localmente
sam local start-api
sam local invoke [FunctionName]

# Desplegar (interactivo)
sam deploy --guided

# Desplegar (no interactivo)
sam deploy

# Eliminar stack
sam delete --stack-name [stack-name] --region [región]

# Ver recursos
sam list stack-resources --stack-name [stack-name]
sam list stack-outputs --stack-name [stack-name]
```

---

## 🔍 Comandos curl (Probar API)

### GET - Obtener todos los items

```bash
curl https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/

# Con más detalles
curl -v https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/

# Guardar en archivo
curl https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/ > response.json
```

### POST - Crear un item

```bash
# Básico
curl -X POST https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"Mi Item"}'

# Con Pretty Print
curl -X POST https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"Mi Item"}' | jq .

# Desde archivo
curl -X POST https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d @datos.json
```

### GET - Obtener un item específico

```bash
curl https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/123

# Con info de headers
curl -i https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/123
```

### DELETE - Eliminar un item

```bash
curl -X DELETE https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/123
```

### Con API Key

```bash
curl -H "x-api-key: [tu-api-key]" \
  https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/
```

---

## 📋 Archivos de Configuración

### template.yaml (Estructura Base)

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Mi aplicación SAM

Transform:
  - AWS::Serverless-2016-10-31

Resources:
  MiFuncion:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/handlers/mi-handler.handler
      Runtime: nodejs18.x
      Role: !Sub arn:aws:iam::${AWS::AccountId}:role/LabRole
      Events:
        Api:
          Type: Api
          Properties:
            Path: /
            Method: GET

  MiTabla:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: id
        Type: String
```

### .github/workflows/pipeline.yaml (Ubicación)

```
.github/
└── workflows/
    └── pipeline.yaml
```

### .gitignore (Lo que NO subir a Git)

```
node_modules/
.aws-sam/
build/
dist/
*.env
.DS_Store
.idea/
```

---

## 📊 Estados del Pipeline

| Estado | Significado | Acción Requerida |
|--------|-----------|-----------------|
| 🔵 In Progress | En ejecución | Esperar |
| ✅ Completed | Exitoso | Siguiente paso |
| ❌ Failed | Error | Verificar logs |
| ⏸️ Waiting for review | Esperando aprobación | Revisar y aprobar |
| ⚠️ Neutral | No requerido | Ignorar |

---

## 🗂️ Estructura de Carpetas

```
sam-api-cicd/
├── .github/
│   └── workflows/
│       └── pipeline.yaml           ← Pipeline CI/CD
├── src/
│   └── handlers/
│       ├── get-all-items.mjs       ← GET /
│       ├── get-by-id.mjs           ← GET /{id}
│       └── put-item.mjs            ← POST /
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
└── template.yaml                   ← Definición de recursos
```

---

## 🔧 Configuración de Entorno Recomendada

### Variables de Entorno (template.yaml)

```yaml
Environment:
  Variables:
    SAMPLE_TABLE: !Ref SampleTable
    ENVIRONMENT: !Sub "${Stage}"
    LOG_LEVEL: INFO
    REGION: !Ref AWS::Region
```

### En runtime (Acceder en Node.js)

```javascript
const tableName = process.env.SAMPLE_TABLE;
const environment = process.env.ENVIRONMENT;
const logLevel = process.env.LOG_LEVEL;
```

---

## 📝 Configuración Recomendada de GitHub

### Ramas Protegidas (Opcional pero Recomendado)

```
Settings → Branches → Branch protection rules
  ✅ Require pull request reviews before merging
  ✅ Require status checks to pass before merging
  ✅ Dismiss stale pull request approvals
```

### Notificaciones

```
Settings → Notifications
  Email: Activar para pull request reviews
  Email: Activar para deployments
```

---

## 🚨 Errores Comunes y Soluciones Rápidas

### InvalidClientTokenId
```
Causa: Token expirado
Solución: Renovar secretos en GitHub con nuevos tokens
```

### Stack already exists
```
Causa: El stack ya fue creado
Solución: sam delete --stack-name [name] --region [región]
         O esperar a que se ejecute sin-fail-on-empty-changeset
```

### 404 Not Found en API
```
Causa: URL incorrecta
Solución: Copiar URL exacta de CloudFormation Outputs
         Verificar que termina con /
```

### 502 Bad Gateway
```
Causa: Error en Lambda
Solución: Ver logs en CloudWatch
         Verificar que el handler retorna formato correcto
```

### AccessDenied
```
Causa: Sin permisos
Solución: Verificar que LabRole existe
         Verificar que tiene permisos de CloudFormation
```

---

## ⏱️ Tiempos Esperados

| Operación | Duración |
|-----------|----------|
| Tests | 5-10 min |
| Build | 10-15 min |
| Deploy Testing | 5-10 min |
| Integration Test | 3-5 min |
| Deploy Production | 5-10 min |
| **Total Pipeline** | **30-50 min** |
| curl a API | <1 segundo |
| Lambda cold start | 1-3 segundos |

---

## 💰 Límites de AWS Academy

| Recurso | Límite |
|---------|--------|
| Lambda invocaciones | 1 millón/mes |
| DynamoDB read units | 25 por segundo |
| DynamoDB write units | 25 por segundo |
| API Gateway requests | 10 millones/mes |
| CloudFormation stacks | 200 |
| Session duration | 4-6 horas |

---

## 📚 Variables de Template.yaml

### Parámetros de Stack Output

```yaml
Outputs:
  WebEndpoint:
    Description: API Gateway endpoint
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/"
  
  TableName:
    Description: DynamoDB Table
    Value: !Ref SampleTable
```

### Funciones Intrínsecas Comunes

```yaml
!Ref ResourceName              # Referencia a recurso
!Sub "string ${variable}"      # Substitución
!GetAtt Resource.Arn           # Obtener atributo
!ImportValue ExportName        # Importar de otro stack
```

---

## 🎓 Atajos Útiles

### Copiar URL de API desde CloudFormation

```bash
# Ver outputs del stack
aws cloudformation describe-stacks \
  --stack-name todo-app-prod \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'
```

### Obtener logs de Lambda

```bash
# Ver últimos logs
aws logs tail /aws/lambda/[function-name] --follow

# Ver logs de última hora
aws logs tail /aws/lambda/[function-name] --since 1h
```

### Listar recursos del stack

```bash
sam list stack-resources --stack-name todo-app-prod
```

---

## 🔗 Links Importantes

### Documentación
- AWS SAM: https://docs.aws.amazon.com/serverless-application-model/
- GitHub Actions: https://docs.github.com/en/actions
- AWS Lambda: https://docs.aws.amazon.com/lambda/
- API Gateway: https://docs.aws.amazon.com/apigateway/

### Herramientas Online
- YAML Validator: https://www.yamllint.com/
- JSON Formatter: https://jsonformatter.org/
- JWT Decoder: https://jwt.io/
- Curl Command: https://curlbuilder.com/

### Comunidades
- Stack Overflow: https://stackoverflow.com/questions/tagged/aws-sam
- AWS Forums: https://forums.aws.amazon.com/
- GitHub Discussions: https://github.com/aws/serverless-application-model/discussions

---

## ✅ Checklist Pre-Ejecución

Antes de hacer push:
- [ ] Credenciales de AWS copiadas
- [ ] Secretos configurados en GitHub
- [ ] Entorno `testenv` creado
- [ ] `.github/workflows/pipeline.yaml` en lugar correcto
- [ ] `template.yaml` válido (sin errores de YAML)
- [ ] Tests pasando localmente (`npm run test`)
- [ ] `package.json` actualizado
- [ ] `.gitignore` configurado

---

## 🎯 Checklist Post-Despliegue

Después de completar el pipeline:
- [ ] Stack `todo-app-prod` en estado CREATE_COMPLETE
- [ ] Stack `todo-app-dev` eliminado (DELETE_COMPLETE)
- [ ] API responde a GET /
- [ ] API responde a POST /
- [ ] API responde a GET /{id}
- [ ] DynamoDB table tiene items
- [ ] CloudWatch Logs muestra ejecuciones
- [ ] Memoria completada con capturas

---

**Última actualización**: Junio 2026

*Guarda esta página como referencia rápida durante la práctica.*

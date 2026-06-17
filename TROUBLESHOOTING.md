# Guía de Troubleshooting: Despliegue CI/CD con SAM

Esta guía ayuda a resolver problemas comunes al ejecutar el pipeline de CI/CD.

---

## Índice

1. [Problemas de Credenciales](#problemas-de-credenciales)
2. [Problemas de Pipeline](#problemas-de-pipeline)
3. [Problemas de Despliegue](#problemas-de-despliegue)
4. [Problemas de API](#problemas-de-api)
5. [FAQ](#faq)

---

## Problemas de Credenciales

### ❌ Error: "InvalidClientTokenId"

**Síntoma en logs**:
```
An error occurred (InvalidClientTokenId) when calling the CreateStack 
operation: The security token included in the request is invalid.
```

**Causas posibles**:
1. Token de AWS expirado
2. Secretos de GitHub no están configurados correctamente
3. Copypaste error en los secretos

**Soluciones**:

1. **Renovar tokens**:
   - Ve a AWS Academy → Learner Lab → AWS Details
   - Copia los nuevos valores de credenciales
   - En GitHub: Settings → Secrets → Actualiza los tres secretos

2. **Verificar secretos en GitHub**:
   - Ve a Settings → Secrets and variables → Actions
   - Confirma que los tres secretos están listados:
     - AWS_ACCESS_KEY_ID
     - AWS_SECRET_ACCESS_KEY
     - AWS_SESSION_TOKEN
   - NO deberías poder ver los valores (están encriptados)

3. **Verificar pipeline.yaml**:
   - Abre `.github/workflows/pipeline.yaml`
   - Confirma que usa:
     ```yaml
     aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
     aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
     aws-session-token: ${{ secrets.AWS_SESSION_TOKEN }}
     ```

---

### ❌ Error: "User is not authorized to perform: cloudformation:CreateStack"

**Síntoma en logs**:
```
An error occurred (AccessDenied) when calling the CreateStack operation: 
User: arn:aws:iam::[account-id]:user/[user] is not authorized to perform: 
cloudformation:CreateStack on resource: *
```

**Causa**: El rol LabRole no tiene permisos suficientes.

**Solución**:
1. Ve a AWS Console → IAM → Roles
2. Busca el rol `LabRole`
3. Verifica que tenga las siguientes políticas:
   - `CloudFormation` (create, delete, update stacks)
   - `Lambda` (create, delete functions)
   - `DynamoDB` (create, delete tables)
   - `APIGateway` (create, delete APIs)
   - `IAM` (pass role)

Si faltan permisos, contacta con el administrador del laboratorio.

---

### ❌ Error: "The security token included in the request is invalid"

**Síntoma**: El pipeline inicia pero falla inmediatamente en "Configure credentials AWS"

**Causa**: El session token de AWS ha expirado.

**Solución**:
- Los tokens de AWS Academy expiran después de 4-6 horas
- Necesitas renovarlos cada vez que se expiren
- Pasos:
  1. Ve a AWS Academy → Click en "Start Lab"
  2. Ve a AWS Details → Show → Credentials (CLI)
  3. Copia los nuevos valores
  4. En GitHub: Settings → Secrets → Actualiza los tres secretos
  5. Retrigger el pipeline o haz un nuevo push

---

## Problemas de Pipeline

### ❌ Error: "npm ERR! ERR! 404"

**Síntoma en logs de build-and-package**:
```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@aws-sdk/client-dynamodb
```

**Causa**: No hay conexión a internet o npm registry está caído.

**Soluciones**:
1. Espera unos minutos y retrigger el pipeline
2. Verifica que package.json tiene las dependencias correctas:
   ```json
   "dependencies": {
     "@aws-sdk/client-dynamodb": "^3.188.0",
     "@aws-sdk/lib-dynamodb": "^3.188.0"
   }
   ```
3. Si persiste, verifica tu conexión a internet (GitHub Actions necesita descargar paquetes)

---

### ❌ Error: "Compilation error in SAM template"

**Síntoma en logs de build-and-package**:
```
Error: Invalid Serverless Application Specification document.
```

**Causa**: Hay un error de sintaxis en `template.yaml`

**Soluciones**:
1. Abre `template.yaml`
2. Verifica la sintaxis YAML:
   - Indentación correcta (espacios, no tabs)
   - Comillas correctas
   - No hay caracteres especiales sin escaping
3. Usa un validador YAML online: https://www.yamllint.com/
4. Compara con el template original en el repositorio

---

### ❌ Error: "Test failed"

**Síntoma en logs de test**:
```
FAIL  __tests__/unit/handlers/get-all-items.test.mjs
```

**Causa**: Los tests unitarios están fallando.

**Soluciones**:
1. Lee los logs detallados del test
2. Identifica qué test está fallando
3. Abre el archivo de test
4. Verifica que el código implementado cumple con las expectativas del test
5. Realiza un fix local:
   ```bash
   npm install
   npm run test
   ```
6. Una vez que los tests pasen localmente, haz commit y push

---

### ❌ Error: "sam: command not found"

**Síntoma**: El pipeline falla en cualquier paso que usa SAM

**Causa**: SAM CLI no se instaló correctamente

**Nota**: En GitHub Actions, esto normalmente no ocurre porque se instala en cada ejecución con:
```yaml
- uses: aws-actions/setup-sam@v2
```

Si ocurre, verifica que el archivo `pipeline.yaml` incluye este step.

---

## Problemas de Despliegue

### ❌ Error: "Stack already exists"

**Síntoma**:
```
CloudFormation error: Stack with id [stack-name] already exists
```

**Causa**: El stack ya existe y SAM intenta crear uno nuevo.

**Soluciones**:

1. **Opción 1: Usar el flag no-fail-on-empty-changeset** (recomendado)
   - El pipeline ya lo incluye: `--no-fail-on-empty-changeset`
   - Si aún falla, verifica que está incluido en el pipeline.yaml

2. **Opción 2: Eliminar el stack manualmente**
   ```bash
   sam delete --stack-name todo-app-dev --region us-east-1
   ```

3. **Opción 3: Usar CloudFormation console**
   - Ve a AWS Console → CloudFormation
   - Selecciona el stack
   - Haz clic en "Delete"
   - Espera a que se elimine
   - Retrigger el pipeline

---

### ❌ Error: "Lambda function initialization failed"

**Síntoma**:
```
Error creating Lambda function: 
The role arn:aws:iam::[account]:role/LabRole is invalid or does not exist
```

**Causa**: El rol especificado en `template.yaml` no existe.

**Solución**:
1. Abre `template.yaml`
2. Verifica que todas las funciones usan:
   ```yaml
   Role: !Sub arn:aws:iam::${AWS::AccountId}:role/LabRole
   ```
3. En AWS Console → IAM → Roles, verifica que existe `LabRole`
4. Si no existe, contacta con el administrador del laboratorio

---

### ❌ Error: "DynamoDB table creation failed"

**Síntoma**:
```
Error creating DynamoDB table: 
Requested write throughput exceeds account limit
```

**Causa**: Has alcanzado los límites de capacidad de DynamoDB.

**Soluciones**:

1. **Reducir capacidad en template.yaml**:
   ```yaml
   ProvisionedThroughput:
     ReadCapacityUnits: 1    # Reducir a 1
     WriteCapacityUnits: 1   # Reducir a 1
   ```

2. **Eliminar tablas anteriores**:
   - Ve a AWS Console → DynamoDB → Tables
   - Elimina tablas no utilizadas

3. **Usar on-demand billing**:
   ```yaml
   BillingMode: PAY_PER_REQUEST
   # Elimina ProvisionedThroughput
   ```

---

### ❌ Error: "Deploy stuck in progress"

**Síntoma**: El despliegue lleva más de 30 minutos sin completarse.

**Causas posibles**:
1. CloudFormation está esperando algún recurso
2. Hay un timeout en algún lado
3. El laboratorio tiene limitaciones de recursos

**Soluciones**:

1. **Verificar en AWS Console**:
   - Ve a CloudFormation → Stacks
   - Selecciona el stack
   - Ve a Events
   - Busca si algún recurso está en CREATE_IN_PROGRESS

2. **Cancelar el despliegue**:
   ```bash
   sam delete --stack-name todo-app-dev --region us-east-1 --no-prompts
   ```

3. **Retrigger el pipeline**:
   - Realiza un nuevo push a la rama main
   - Esto iniciará un nuevo workflow

---

## Problemas de API

### ❌ Error: "404 Not Found"

**Síntoma**: Al hacer curl a la URL de la API, obtengo 404.

**Causas posibles**:
1. La URL es incorrecta
2. El API Gateway no está respondiendo
3. El despliegue no completó correctamente

**Soluciones**:

1. **Verificar la URL**:
   - Obtén la URL del CloudFormation Stack Outputs
   - Debe verse así: `https://[id].execute-api.us-east-1.amazonaws.com/Prod/`
   - Verifica que terminates en `/` (slash al final)

2. **Probar la conectividad**:
   ```bash
   curl -v https://[id].execute-api.us-east-1.amazonaws.com/Prod/
   ```
   - Deberías obtener un código 200 o 500
   - Un 404 significa que el endpoint no existe

3. **Verificar en API Gateway**:
   - Ve a AWS Console → API Gateway
   - Verifica que la API existe
   - Verifica que los métodos están configurados

---

### ❌ Error: "502 Bad Gateway"

**Síntoma**: La API retorna 502 Bad Gateway.

**Causa**: Hay un problema con la función Lambda.

**Soluciones**:

1. **Ver logs de Lambda**:
   - Ve a AWS Console → Lambda
   - Selecciona la función que falla
   - Ve a CloudWatch Logs
   - Busca el error específico

2. **Posibles errores en logs**:
   - `SyntaxError`: Verifica la sintaxis del código JavaScript
   - `ReferenceError`: Variable no definida
   - `TimeoutError`: La función tarda más de lo permitido

3. **Pasos para fijar**:
   - Corrige el código en tu repo local
   - Haz commit y push
   - El pipeline desplegará automáticamente la versión corregida

---

### ❌ Error: "Empty response from Lambda"

**Síntoma**: La API retorna una respuesta vacía o 500.

**Causa**: La función Lambda no está retornando un formato correcto.

**Soluciones**:

1. **Verificar el formato de respuesta** en los handlers:
   ```javascript
   export const handler = async (event) => {
     try {
       // Tu código
       return {
         statusCode: 200,
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ message: 'Success' }),
       };
     } catch (err) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: err.message }),
       };
     }
   };
   ```

2. **Ver logs de CloudWatch**:
   - Lambda → Selecciona función → Monitor → View logs

---

### ❌ Error: "CORS error" en navegador

**Síntoma**: Desde un navegador, obtengo error CORS.

**Causa**: El API Gateway no tiene CORS habilitado correctamente.

**Solución**: El template.yaml ya incluye CORS:
```yaml
Globals:
  Api:
    Cors:
      AllowMethods: "'GET,POST,PUT,OPTIONS'"
      AllowHeaders: "'content-type'"
      AllowOrigin: "'*'"
```

Si aún tienes problema:
1. Ve a API Gateway en AWS Console
2. Selecciona tu API
3. Ve a Resources → /
4. Haz clic en OPTIONS
5. Verifica que CORS está configurado

---

### ❌ Error: "Timeout" al llamar a la API

**Síntoma**: La API tarda mucho o timeout.

**Causa**: La Lambda tarda más de lo esperado (timeout configurado a 100s).

**Soluciones**:

1. **Aumentar timeout en template.yaml**:
   ```yaml
   Timeout: 300  # Aumentar de 100 a 300 segundos
   ```

2. **Optimizar el código**:
   - Usar promesas en lugar de callbacks
   - Reducir número de operaciones de BD
   - Usar índices en DynamoDB

3. **Ver logs**:
   - CloudWatch Logs → Buscar TimeoutError

---

## FAQ

### P: ¿Cuánto tiempo tarda todo el pipeline?

**R**: Normalmente:
- Tests: 5-10 minutos
- Build: 10-15 minutos
- Deploy testing: 5-10 minutos
- Integration test: 3-5 minutos
- Manual review: Depende de ti
- Deploy prod: 5-10 minutos

**Total**: 30-50 minutos sin contar espera manual

---

### P: ¿Qué pasa si apruebo el despliegue por error?

**R**: 
1. La aplicación se desplegará a producción
2. El stack de testing se eliminará automáticamente
3. No hay forma de "deshacer" automáticamente
4. Opciones:
   - Realizar otro cambio y repetir el pipeline para actualizar a la versión correcta
   - Eliminar manualmente el stack de producción y esperar al próximo despliegue

**Recomendación**: Ten cuidado al revisar. Siempre verifica los cambios antes de aprobar.

---

### P: ¿Puedo detener un pipeline en ejecución?

**R**: Sí:
1. Ve a GitHub → Actions
2. Selecciona el workflow en ejecución
3. Haz clic en "Cancel workflow"

Esto detendrá inmediatamente todos los jobs.

---

### P: ¿Qué pasa si falla una etapa?

**R**: El pipeline se detiene. Las etapas posteriores no se ejecutan.

Opciones para continuar:
1. Haz otro push para retrigger el pipeline
2. Cancela el workflow y haz cambios antes de reintentar

---

### P: ¿Puedo desplegar más de una vez al día?

**R**: Sí, ilimitadamente. Cada push a `main` dispara un nuevo pipeline.

**Nota**: En proyectos profesionales, generalmente hay limitaciones para evitar despliegues excesivos.

---

### P: ¿Cómo veo los logs del pipeline?

**R**:
1. Ve a GitHub → Actions
2. Selecciona el workflow
3. Haz clic en el job que deseas
4. Expande cada step haciendo clic en él
5. Los logs se muestran en la consola

---

### P: ¿Puedo usar el pipeline con ramas diferentes a `main`?

**R**: Sí, pero necesitas modificar el archivo `pipeline.yaml`:

```yaml
on:
  push:
    branches:
      - 'main'
      - 'develop'
      - 'staging'
```

Así, el pipeline se ejecutará en cada push a cualquiera de estas ramas.

---

### P: ¿Qué pasa con los costos de AWS?

**R**: 
- **Laboratorio AWS Academy**: Tiene límites y credenciales limitadas. Generalmente no hay costos adicionales.
- **AWS real**: Los recursos (Lambda invocaciones, DynamoDB, API Gateway) tienen costo.
- **Recomendación**: Elimina los stacks cuando no los uses para no acumular costos innecesarios.

---

### P: ¿Cómo elimino los recursos de AWS?

**R**: Opciones:

1. **Desde el pipeline** (recomendado):
   - El pipeline ya lo hace automáticamente al eliminar el stack de testing
   - Para producción, necesitas eliminar manualmente

2. **Manualmente desde AWS Console**:
   ```bash
   sam delete --stack-name todo-app-prod --region us-east-1
   ```

3. **Desde AWS Console**:
   - CloudFormation → Stacks → Selecciona → Delete

---

### P: ¿Puedo usar regiones diferentes a us-east-1?

**R**: Sí. Modifica en `pipeline.yaml`:

```yaml
TESTING_REGION: eu-west-1
PROD_REGION: eu-west-1
```

---

### P: ¿Cómo añado más variables de entorno?

**R**: Edita `template.yaml` en cada función Lambda:

```yaml
Environment:
  Variables:
    SAMPLE_TABLE: !Ref SampleTable
    MI_VARIABLE: "valor"
    OTRO: "otro valor"
```

---

### P: ¿Puedo editar manualmente los recursos en AWS?

**R**: Técnicamente sí, pero **NO es recomendable** porque:
- Los cambios se sobrescribirán en el próximo despliegue
- Es difícil rastrear quién hizo qué cambios
- Viola el principio de "Infrastructure as Code"

**Mejor práctica**: Realiza todos los cambios en el código/template, haz commit y deja que el pipeline lo despliegue.

---

## Contacto y Ayuda

Si necesitas más ayuda:

1. **Revisar logs**: Los logs generalmente indican exactamente qué está mal
2. **Google del error**: La mayoría de errores ya han sido resueltos
3. **Documentación oficial**:
   - AWS SAM: https://docs.aws.amazon.com/serverless-application-model/
   - GitHub Actions: https://docs.github.com/en/actions
4. **Stack Overflow**: Busca el error específico
5. **Tu instructor/profesor**: Si estás en un curso

---

**Última actualización**: Junio 2026

*Si encuentras un problema no listado aquí, documéntalo y comparte con otros estudiantes.*

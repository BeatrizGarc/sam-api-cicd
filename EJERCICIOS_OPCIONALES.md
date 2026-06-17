# Ejercicios Opcionales: Mejoras y Expansiones de la Práctica

Después de completar la práctica básica, estos ejercicios te permiten profundizar y crear una solución más profesional.

---

## 📚 Nivel 1: Principiante (Después de completar la práctica básica)

### Ejercicio 1.1: Personalizar el Cliente Web

**Objetivo**: Crear un frontend web simple para consumir la API.

**Instrucciones**:
1. Ve a la carpeta `cliente-api-cicd/`
2. Crea un archivo `index.html` simple:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi API REST</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        input, button { padding: 10px; margin: 5px; }
        .item { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>API REST con SAM</h1>
    
    <div>
        <h2>Crear Item</h2>
        <input type="text" id="itemId" placeholder="ID">
        <input type="text" id="itemName" placeholder="Nombre">
        <button onclick="createItem()">Crear</button>
    </div>
    
    <div>
        <h2>Items</h2>
        <button onclick="getAllItems()">Obtener Todos</button>
        <div id="items"></div>
    </div>
    
    <div>
        <h2>Buscar Item</h2>
        <input type="text" id="searchId" placeholder="ID del item">
        <button onclick="getItemById()">Buscar</button>
        <div id="searchResult"></div>
    </div>

    <script>
        const API_URL = 'https://[TU_API_ID].execute-api.us-east-1.amazonaws.com/Prod/';
        
        async function getAllItems() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                document.getElementById('items').innerHTML = 
                    JSON.stringify(data, null, 2);
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }
        
        async function createItem() {
            const id = document.getElementById('itemId').value;
            const name = document.getElementById('itemName').value;
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, name })
                });
                const data = await response.json();
                alert('Item creado: ' + JSON.stringify(data));
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }
        
        async function getItemById() {
            const id = document.getElementById('searchId').value;
            
            try {
                const response = await fetch(API_URL + id);
                const data = await response.json();
                document.getElementById('searchResult').innerHTML = 
                    JSON.stringify(data, null, 2);
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }
    </script>
</body>
</html>
```

**Resultado esperado**: Un frontend simple que consume la API

---

### Ejercicio 1.2: Agregar Logueo a Funciones Lambda

**Objetivo**: Mejorar debugging agregando logs a las funciones.

**Instrucciones**:

1. Abre `src/handlers/get-all-items.mjs`
2. Agrega logs en los puntos clave:

```javascript
export const getAllItemsHandler = async (event, context) => {
    console.log('getAllItemsHandler iniciado');
    console.log('Event:', JSON.stringify(event));
    
    try {
        // ... tu código aquí
        console.log('Items obtenidos correctamente');
        return {
            statusCode: 200,
            body: JSON.stringify(items)
        };
    } catch (err) {
        console.error('Error en getAllItemsHandler:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
```

3. Haz commit y push
4. El pipeline se ejecutará automáticamente
5. Verifica los logs en CloudWatch Logs después del despliegue

**Resultado esperado**: Logs detallados en CloudWatch para debugging

---

### Ejercicio 1.3: Añadir Validación de Entrada

**Objetivo**: Validar datos de entrada en los handlers.

**Instrucciones**:

1. Edita `src/handlers/put-item.mjs`
2. Agrega validación:

```javascript
export const putItemHandler = async (event, context) => {
    console.log('putItemHandler iniciado');
    
    try {
        // Parsear body
        const body = JSON.parse(event.body);
        
        // Validar campos requeridos
        if (!body.id || !body.name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    error: 'Campos requeridos: id, name' 
                })
            };
        }
        
        // Validar longitudes
        if (body.name.length < 3) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    error: 'El nombre debe tener al menos 3 caracteres' 
                })
            };
        }
        
        // ... resto del código
    } catch (err) {
        console.error('Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
```

3. Haz commit y push
4. Prueba con datos inválidos para verificar la validación

**Resultado esperado**: API rechaza datos inválidos con mensajes claros

---

## 📚 Nivel 2: Intermedio (Para aprender más)

### Ejercicio 2.1: Agregar Operación DELETE

**Objetivo**: Extender la API con más funcionalidad.

**Instrucciones**:

1. Crea un nuevo archivo `src/handlers/delete-item.mjs`:

```javascript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const deleteItemHandler = async (event, context) => {
    console.log('deleteItemHandler iniciado');
    
    try {
        const tableName = process.env.SAMPLE_TABLE;
        const id = event.pathParameters.id;
        
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'ID requerido' })
            };
        }
        
        await docClient.send(
            new DeleteCommand({
                TableName: tableName,
                Key: { id }
            })
        );
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: `Item ${id} eliminado exitosamente` 
            })
        };
    } catch (err) {
        console.error('Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
```

2. Edita `template.yaml` y añade la nueva función Lambda:

```yaml
deleteItemFunction:
  Type: AWS::Serverless::Function
  Properties:
    Role: !Sub arn:aws:iam::${AWS::AccountId}:role/LabRole
    Handler: src/handlers/delete-item.deleteItemHandler
    Runtime: nodejs18.x
    MemorySize: 128
    Timeout: 100
    Environment:
      Variables:
        SAMPLE_TABLE: !Ref SampleTable
    Events:
      Api:
        Type: Api
        Properties:
          Path: /{id}
          Method: DELETE
```

3. Haz commit y push
4. El pipeline se ejecutará automáticamente
5. Prueba el nuevo endpoint:
   ```bash
   curl -X DELETE https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/1
   ```

**Resultado esperado**: Nuevo endpoint DELETE funcionando

---

### Ejercicio 2.2: Agregar Unit Tests Adicionales

**Objetivo**: Mejorar cobertura de tests.

**Instrucciones**:

1. Crea un nuevo archivo `__tests__/unit/handlers/delete-item.test.mjs`:

```javascript
import { deleteItemHandler } from '../../../src/handlers/delete-item.mjs';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('deleteItemHandler', () => {
    beforeEach(() => {
        ddbMock.reset();
    });

    it('debe eliminar un item', async () => {
        ddbMock.on(DeleteCommand).resolves({});
        
        const event = {
            pathParameters: {
                id: '123'
            }
        };
        
        const response = await deleteItemHandler(event);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toContain('eliminado exitosamente');
    });

    it('debe retornar error si no hay ID', async () => {
        const event = {
            pathParameters: {}
        };
        
        const response = await deleteItemHandler(event);
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toContain('ID requerido');
    });
});
```

2. Haz commit y push
3. Los tests se ejecutarán automáticamente

**Resultado esperado**: Tests adicionales ejecutándose en el pipeline

---

### Ejercicio 2.3: Implementar Monitorización con CloudWatch

**Objetivo**: Agregar métricas y alertas personalizadas.

**Instrucciones**:

1. Edita `template.yaml` y agrega alarmas:

```yaml
DynamoDBErrorsAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmDescription: Alarma para errores en DynamoDB
    MetricName: ConsumedWriteCapacityUnits
    Namespace: AWS/DynamoDB
    Statistic: Sum
    Period: 300
    EvaluationPeriods: 1
    Threshold: 10
    ComparisonOperator: GreaterThanThreshold
    Dimensions:
      - Name: TableName
        Value: !Ref SampleTable

LambdaErrorsAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmDescription: Alarma para errores en Lambda
    MetricName: Errors
    Namespace: AWS/Lambda
    Statistic: Sum
    Period: 60
    EvaluationPeriods: 2
    Threshold: 5
    ComparisonOperator: GreaterThanOrEqualToThreshold
    Dimensions:
      - Name: FunctionName
        Value: !Ref getAllItemsFunction
```

2. Haz commit y push
3. Después del despliegue, verifica las alarmas en CloudWatch

**Resultado esperado**: Alarmas creadas y activas en CloudWatch

---

## 📚 Nivel 3: Avanzado (Para proyecto profesional)

### Ejercicio 3.1: Implementar Autenticación con API Keys

**Objetivo**: Asegurar la API con autenticación básica.

**Instrucciones**:

1. Edita `template.yaml` y agrega autorización:

```yaml
MyApi:
  Type: AWS::Serverless::Api
  Properties:
    Auth:
      ApiKeyRequired: true
      Authorizers:
        ApiKeyAuth:
          FunctionArn: !GetAtt AuthorizerFunction.Arn

AuthorizerFunction:
  Type: AWS::Serverless::Function
  Properties:
    Handler: src/authorizers/api-key-auth.handler
    Runtime: nodejs18.x
    Inline: true
    Role: !Sub arn:aws:iam::${AWS::AccountId}:role/LabRole
```

2. Crea `src/authorizers/api-key-auth.mjs`:

```javascript
export const handler = async (event, context) => {
    const apiKey = event.headers['x-api-key'];
    
    if (apiKey !== process.env.VALID_API_KEY) {
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: event.methodArn
                    }
                ]
            }
        };
    }
    
    return {
        principalId: 'user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: event.methodArn
                }
            ]
        }
    };
};
```

3. Configura la API key en GitHub Secrets: `API_KEY_VALUE`
4. Haz commit y push

**Resultado esperado**: API requiere header `x-api-key` para acceso

---

### Ejercicio 3.2: Implementar Versionamiento de API

**Objetivo**: Crear versiones de la API para cambios futuros.

**Instrucciones**:

1. Crea una nueva carpeta `src/v2/` con handlers mejorados
2. En `template.yaml`, configura dos APIs:

```yaml
ApiV1:
  Type: AWS::Serverless::Api
  Properties:
    StageName: v1

ApiV2:
  Type: AWS::Serverless::Api
  Properties:
    StageName: v2

# Conectar funciones a ambas APIs
getAllItemsFunctionV1:
  Type: AWS::Serverless::Function
  Properties:
    Events:
      Api:
        Type: Api
        Properties:
          RestApiId: !Ref ApiV1
          Path: /items
          Method: GET

getAllItemsFunctionV2:
  Type: AWS::Serverless::Function
  Properties:
    Events:
      Api:
        Type: Api
        Properties:
          RestApiId: !Ref ApiV2
          Path: /items
          Method: GET
```

3. Despliega y prueba:
   ```bash
   # V1
   curl https://[API-ID].execute-api.us-east-1.amazonaws.com/v1/items
   
   # V2
   curl https://[API-ID].execute-api.us-east-1.amazonaws.com/v2/items
   ```

**Resultado esperado**: API con soporte para múltiples versiones

---

### Ejercicio 3.3: Agregar Documentación OpenAPI/Swagger

**Objetivo**: Crear documentación interactiva de la API.

**Instrucciones**:

1. Crea un archivo `openapi.yaml`:

```yaml
openapi: 3.0.0
info:
  title: Mi API REST
  version: 1.0.0
  description: API para gestionar items

servers:
  - url: https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod

paths:
  /:
    get:
      summary: Obtener todos los items
      responses:
        '200':
          description: Lista de items
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  Items:
                    type: array
    
    post:
      summary: Crear un item
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: string
                name:
                  type: string
      responses:
        '200':
          description: Item creado
  
  /{id}:
    get:
      summary: Obtener un item por ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Item encontrado
    
    delete:
      summary: Eliminar un item
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Item eliminado
```

2. Sube el archivo a tu repo
3. Publica la documentación usando Swagger UI:
   - https://swagger.io/tools/swagger-ui/
   - Carga tu archivo `openapi.yaml`

**Resultado esperado**: Documentación interactiva disponible

---

## 🎓 Desafíos (Para profundizar)

### Desafío 1: Implementar CI/CD con múltiples regiones

**Objetivo**: Desplegar en us-east-1, eu-west-1 y ap-southeast-1

**Pasos**:
1. Modificar `pipeline.yaml` para crear múltiples jobs de deployment
2. Cada región tiene su propio stack
3. Todos los tests se ejecutan una sola vez
4. Los deployments se ejecutan en paralelo

---

### Desafío 2: Implementar Blue-Green Deployment

**Objetivo**: Combinar los conocimientos de ambas arquitecturas

**Pasos**:
1. Crear dos versiones de la API (blue y green)
2. El tráfico se conmuta gradualmente
3. Si hay errores, rollback automático

---

### Desafío 3: Implementar Notificaciones

**Objetivo**: Recibir notificaciones de despliegues

**Pasos**:
1. Integrar Slack con GitHub Actions
2. Notificaciones cuando:
   - Tests pasan/fallan
   - Deploy completa
   - Esperando aprobación
   - Deploy a producción completado

---

### Desafío 4: Costo Optimization

**Objetivo**: Minimizar costos de AWS

**Mejoras**:
- Usar DynamoDB on-demand en lugar de provisioned
- Reducir memoria de Lambda
- Usar caching en API Gateway
- Implementar auto-scaling

---

## 🏆 Proyecto Final: Tu Propia API

**Objetivo**: Crear una API completamente personalizada

**Requisitos**:
- ✅ Al menos 3 funciones Lambda
- ✅ DynamoDB para persistencia
- ✅ Tests unitarios (>80% cobertura)
- ✅ Tests de integración
- ✅ Pipeline CI/CD funcional
- ✅ Documentación OpenAPI
- ✅ Cliente web/frontend

**Ideas de APIs**:
- **Blog API**: Crear, editar, eliminar posts
- **Todo App**: Gestionar tareas
- **Inventario**: Gestionar productos
- **Chat API**: Enviar y obtener mensajes
- **Galería de fotos**: Subir y descargar imágenes

---

## 📚 Recursos para Aprender Más

### Documentación Oficial
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)

### Tutoriales Online
- [AWS Hands-on Labs](https://www.aws-amazon.com.cn/events/china/training-workshop/)
- [GitHub Skills](https://skills.github.com/)
- [Serverless Stack](https://serverless-stack.com/)

### Libros
- "AWS in Action" - Witten, Wittig
- "Infrastructure as Code" - Kief Morris
- "The Phoenix Project" - Gene Kim

---

## ✅ Checklist de Ejercicios

**Nivel 1 (Principiante)**:
- [ ] Ejercicio 1.1: Cliente Web
- [ ] Ejercicio 1.2: Logueo
- [ ] Ejercicio 1.3: Validación

**Nivel 2 (Intermedio)**:
- [ ] Ejercicio 2.1: DELETE operation
- [ ] Ejercicio 2.2: Tests adicionales
- [ ] Ejercicio 2.3: Monitorización

**Nivel 3 (Avanzado)**:
- [ ] Ejercicio 3.1: Autenticación
- [ ] Ejercicio 3.2: Versionamiento
- [ ] Ejercicio 3.3: Documentación OpenAPI

**Desafíos**:
- [ ] Desafío 1: Múltiples regiones
- [ ] Desafío 2: Blue-Green
- [ ] Desafío 3: Notificaciones
- [ ] Desafío 4: Optimización de costos

**Proyecto Final**:
- [ ] Proyecto completado

---

**¡Que disfrutes aprendiendo! 🚀**

*Recuerda: La mejor forma de aprender es haciendo. No dudes en experimentar y romper cosas (en tu propio sandbox, claro).*

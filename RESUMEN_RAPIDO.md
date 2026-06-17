# Resumen Rápido: Guía de 5 Minutos

Si tienes poco tiempo, aquí está el flujo rápido para completar la práctica.

---

## ⚡ TL;DR (Too Long; Didn't Read)

1. **Crea repositorio** en GitHub: https://github.com/new
2. **Copia archivos** de `cicd/` a tu repo
3. **Copia `pipeline.yaml`** a `.github/workflows/pipeline.yaml`
4. **Configura secretos** en GitHub (3 secrets de AWS)
5. **Crea entorno** `testenv` con aprobación manual
6. **Haz push** a main
7. **Espera a que termine** el pipeline
8. **Aprueba despliegue** a producción
9. **Prueba la API** con curl
10. **Crea memoria** con capturas

---

## 📋 Checklist de Configuración

### GitHub Setup (5 minutos)

```bash
# 1. Crear repo localmente
mkdir sam-api-cicd
cd sam-api-cicd
git init

# 2. Copiar archivos
# Copiar contenido de sesiones_7_8_sam_cicd/cicd/

# 3. Crear estructura de workflows
mkdir -p .github/workflows
# Copiar pipeline.yaml a .github/workflows/pipeline.yaml

# 4. Primer commit
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/sam-api-cicd.git
git branch -M main
git push -u origin main
```

### GitHub Secrets (3 minutos)

Ve a `Settings` → `Secrets and variables` → `Actions`

Crea 3 secrets:
- `AWS_ACCESS_KEY_ID` = Tu AWS access key
- `AWS_SECRET_ACCESS_KEY` = Tu AWS secret key  
- `AWS_SESSION_TOKEN` = Tu AWS session token

### GitHub Environment (2 minutos)

Ve a `Settings` → `Environments`

Crear entorno:
- Name: `testenv`
- Require reviewers: ✅ Activado

---

## 🚀 Ejecutar Pipeline

### Disparar Pipeline

```bash
# Hacer cambio en código
echo "// Updated" >> src/handlers/get-all-items.mjs

# Subir cambio
git add .
git commit -m "Update handler"
git push
```

### Monitorear Pipeline

1. Ve a GitHub → `Actions`
2. Espera a que termine (30-50 minutos)
3. Verás: ✅ test → ✅ build → ✅ deploy-testing → ✅ integration-test → ⏸️ waiting

### Aprobar Despliegue

1. En Actions, busca "waiting for review"
2. Haz clic en "Review deployments"
3. Haz clic en "Approve and deploy"
4. Espera a que se complete

---

## 🧪 Probar API

Obtén la URL de API desde CloudFormation Stack Outputs o de los logs de GitHub Actions.

```bash
# Test 1: GET todos los items
curl https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/

# Test 2: POST crear item
curl -X POST https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"Test"}'

# Test 3: GET item específico
curl https://[API-ID].execute-api.us-east-1.amazonaws.com/Prod/1
```

---

## 📝 Crear Memoria

Crea un documento con:

1. **URL del repositorio**
2. **Capturas de**:
   - Repositorio GitHub creado
   - Secrets configurados
   - Workflow ejecutándose
   - Pipeline waiting for review
   - Diálogo de aprobación
   - Pipeline completo (todas etapas verdes)
   - CloudFormation stacks
   - Tests API (curl)
3. **Explicar**: Qué es CI/CD, por qué es importante
4. **Conclusiones**: Qué aprendiste

---

## 🆘 Si Algo Falla

| Error | Causa | Solución |
|-------|-------|----------|
| "InvalidClientTokenId" | Token expirado | Renovar secretos (AWS Academy) |
| "AccessDenied" | Sin permisos | Verificar LabRole existe |
| "404 Not Found" | URL incorrecta | Copiar URL correcta de CloudFormation |
| "502 Bad Gateway" | Error en Lambda | Ver logs de CloudWatch |
| Pipeline se detiene | Tests fallan | Corregir código, hacer push de nuevo |

**Si persiste**: Ve a [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📚 Documentos Útiles

- **Guía Completa**: [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md)
- **Plantilla Memoria**: [PLANTILLA_MEMORIA.md](./PLANTILLA_MEMORIA.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Pipeline**: [pipeline.yaml](./pipeline.yaml)

---

## ⏱️ Cronograma Estimado

| Paso | Duración | Total |
|------|----------|-------|
| Preparar archivos | 10 min | 10 min |
| Crear repo GitHub | 5 min | 15 min |
| Configurar secretos | 5 min | 20 min |
| Crear entorno | 2 min | 22 min |
| Hacer push inicial | 2 min | 24 min |
| **Pipeline ejecutándose** | **30-50 min** | **54-74 min** |
| Aprobar despliegue | 2 min | ~76 min |
| Probar API | 5 min | ~81 min |
| Crear memoria | 30-60 min | **~111-141 min** |

**Total**: 1.5-2.5 horas

---

## 💡 Tips

1. ✅ Ten los tokens de AWS listos antes de empezar
2. ✅ Verifica que la rama es `main` (no `master`)
3. ✅ No olvides el `/` al final de la URL de API
4. ✅ Los tokens expiran - anótalos temporalmente
5. ✅ Toma screenshots mientras ejecutas (para la memoria)
6. ✅ Lee los logs si algo falla - suelen indicar el problema
7. ✅ El pipeline tarda tiempo - no lo canceles prematuramente
8. ✅ Siempre prubeba con `curl -v` para ver headers

---

## 🎯 Resultado Final

Al terminar tendrás:

- ✅ Aplicación desplegada en AWS (production)
- ✅ Pipeline CI/CD automático en GitHub Actions
- ✅ Tests ejecutándose automáticamente
- ✅ Aprobación manual requerida
- ✅ Entorno de pruebas vs producción
- ✅ API funcional y accesible
- ✅ Experiencia con DevOps moderno

---

## 🚨 No Olvides

- **Renovar tokens**: Cada 4-6 horas (AWS Academy)
- **Limpiar recursos**: Al terminar, elimina stacks en CloudFormation
- **Documentar**: Crea la memoria con capturas
- **Compartir URL**: Incluye la URL del repo en la memoria

---

**¿Listo? Comienza en [GUIA_CICD_COMPLETA.md](./GUIA_CICD_COMPLETA.md) para instrucciones detalladas.**

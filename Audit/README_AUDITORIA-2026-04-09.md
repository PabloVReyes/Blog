# 🧠 Auditoría Técnica del Proyecto

## 📌 Qué hace este archivo

Este documento sirve como:
- **Diagnóstico técnico completo** del estado actual del código
- **Backlog SCRUM ejecutable** listo para planificación de sprints
- **Guía de refactorización paso a paso** con acciones concretas
- **Plan de mejora progresivo** priorizado por impacto
- **Base técnica** para decisiones de arquitectura y desarrollo

> **Nota**: Todos los hallazgos están basados en archivos reales del repositorio con rutas exactas y soluciones aplicables inmediatamente.

---

## 📊 Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Total archivos TypeScript** | ~864 |
| **Archivos Backend (.ts)** | ~207 |
| **Archivos Frontend (.tsx/.ts)** | ~150+ |
| **Uso de `any` detectado** | 8 instancias |
| **Errores ortográficos** | 15+ |
| **Tests existentes** | 1 (solo auth) |
| **Cobertura Frontend** | 0% |

### 🎯 Conclusión General
El proyecto presenta una **arquitectura sólida** con patrones DDD (Backend) y Feature-Sliced Design (Frontend) bien implementados. Sin embargo, existen **oportunidades críticas de mejora** en:
1. **Eliminación de código duplicado** en componentes CRUD del Frontend
2. **Corrección de errores ortográficos** que impactan la percepción profesional
3. **Tipado estricto** para mayor seguridad de tipos
4. **Implementación de testing** (cobertura actual mínima)

---

## 🔎 Hallazgos Técnicos

### 1. ARQUITECTURA

| Aspecto | Estado | Observación |
|---------|--------|-------------|
| **Backend** | ✅ Bueno | Arquitectura Modular DDD con separación Controller-Service-Repository |
| **Frontend** | ✅ Bueno | Feature-Sliced Design con stores Zustand reutilizables |
| **Patrones** | ✅ Bueno | CRUD factory pattern, asyncHandler consistente |
| **SOLID** | ⚠️ Regular | Violaciones menores en tipado de funciones |

**Hallazgos Específicos:**

```
[ARCHIVO] Backend/src/utils/asyncHandler.ts
[LINEA] 4
[PROBLEMA] Uso de tipo 'Function' genérico sin especificidad. Violación de SOLID.
[CODIGO_ACTUAL] export const asyncHandler = (fn: Function) =>
[SOLUCIÓN] export const asyncHandler = <T extends (req: Request, res: Response, next: NextFunction) => Promise<unknown>>(fn: T) =>
[PRIORIDAD] 🟡 Medio
```

```
[ARCHIVO] Backend/src/app.ts
[LINEA] 51
[PROBLEMA] Variable en snake_case en lugar de camelCase (inconsistencia)
[CODIGO_ACTUAL] const public_path = path.resolve(__dirname, '../uploads');
[SOLUCIÓN] const publicPath = path.resolve(__dirname, '../uploads');
[PRIORIDAD] 🟢 Bajo
```

---

### 2. TYPESCRIPT - USO DE ANY Y TIPOS

**Hallazgos Críticos:**

```
[ARCHIVO] Frontend/src/features/Systems/private/types/agreementPerson.types.ts
[LINEA] 10
[PROBLEMA] Campo 'holders' tipado como 'any[]' sin definición de estructura
[CODIGO_ACTUAL] holders?: any[];
[SOLUCIÓN] holders?: AgreementPerson[];
[PRIORIDAD] 🟠 Alto
```

```
[ARCHIVO] Backend/prisma/seedConvenio.ts
[LINEA] 11
[PROBLEMA] Uso explícito de 'any[]' para datos JSON sin tipado
[CODIGO_ACTUAL] const rawData: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
[SOLUCIÓN] 
interface RawPersonData { id: number; name: string; /* ... */ }
const rawData: RawPersonData[] = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as RawPersonData[];
[PRIORIDAD] 🟡 Medio
```

```
[ARCHIVO] Frontend/src/features/Macroprocess/public/hook/useManualMap.ts
[LINEA] 29
[PROBLEMA] Uso de 'any' para tipado de mapa de manuales
[CODIGO_ACTUAL] const map: Record<string, any> = {};
[SOLUCIÓN] const map: Record<string, ManualData | null> = {};
[PRIORIDAD] 🟡 Medio
```

```
[ARCHIVO] Frontend/src/lib/createCrudApi.ts
[LINEA] 13
[PROBLEMA] 'any' en tipo genérico Filters
[CODIGO_ACTUAL] Filters extends Record<string, any> = {}
[SOLUCIÓN] Filters extends Record<string, string | number | boolean | undefined> = {}
[PRIORIDAD] 🟡 Medio
```

---

### 3. CÓDIGO DUPLICADO

**Patrón CRUD Repetido:**

```
[ARCHIVO] Múltiples: Certification, Downloads, Standards, Juristic, Vacation
[PROBLEMA] Patrón Add.tsx, Edit.tsx, Delete.tsx, Form.tsx casi idéntico en cada feature
[IMPACTO] Alto - Mantenimiento difícil, inconsistencias propensas
[SOLUCIÓN] Crear componentes genéricos reutilizables:
  - CrudForm<T>
  - CrudAddDialog<T>
  - CrudEditDialog<T>
  - CrudDeleteDialog
[PRIORIDAD] 🟠 Alto
```

**Lógica de Submit Repetida:**

```
[ARCHIVO] Features/*/private/components/Edit.tsx
[PROBLEMA] Patrón repetido: useForm, handleSubmit con FormData, showSuccessModal, Notify error
[CODIGO_EJEMPLO]
const handleSubmit = async (values: typeof form.values) => {
    try {
        setLoading(true)
        const formData = new FormData()
        // ... append fields
        await update?.(id.toString(), formData)
        showSuccessModal("...", "...")
    } catch (error: unknown) {
        Notify({...})
    } finally {
        setLoading(false)
    }
}
[SOLUCIÓN] Crear hook useCrudSubmit que encapsule la lógica común
[PRIORIDAD] 🟠 Alto
```

**Lógica de Mapeo Duplicada:**

```
[ARCHIVO] Backend/src/modules/systems/agreementPerson/agreementPerson.repository.ts
[LINEA] 183-190 y 247-254
[PROBLEMA] Lógica de mapeo duplicada entre funciones
[SOLUCIÓN] Extraer función privada mapAgreementPersonWithDependents(person)
[PRIORIDAD] 🟡 Medio
```

---

### 4. MANEJO DE ERRORES

```
[ARCHIVO] Backend/src/modules/users/user.service.ts
[LINEA] 33-35
[PROBLEMA] Error de envío de email oculta el error real con mensaje genérico
[CODIGO_ACTUAL] throw new HttpError(500, "Error al crear usuario")
[SOLUCIÓN] throw new HttpError(500, "Error al enviar credenciales por correo. El usuario fue creado pero notifique al administrador.")
[PRIORIDAD] 🟡 Medio
```

```
[ARCHIVO] Frontend/src/features/Macroprocess/public/hook/useManualMap.ts
[LINEA] 42-44
[PROBLEMA] Error de rate limit no se propaga al estado global
[SOLUCIÓN] Incluir en el estado global de rate limiting de la aplicación
[PRIORIDAD] 🟡 Medio
```

---

### 5. SEGURIDAD

```
[ARCHIVO] Frontend/src/features/auth/store/Auth.tsx
[LINEA] 37-40
[PROBLEMA] Token JWT almacenado en localStorage vulnerable a XSS
[CODIGO_ACTUAL] 
const saveTokenToStorage = (token: string) => localStorage.setItem(STORAGE_TOKEN_KEY, token)
const getTokenFromStorage = () => localStorage.getItem(STORAGE_TOKEN_KEY)
[SOLUCIÓN] Migrar a httpOnly cookies o usar sessionStorage + refresh token pattern
[PRIORIDAD] 🟠 Alto
```

```
[ARCHIVO] Backend/src/modules/files/files.service.ts
[LINEA] 1-11
[PROBLEMA] Acceso a archivos por nombre sin sanitización adicional del path
[CODIGO_ACTUAL] const filePath = path.join(UPLOAD_DIR, fileName);
[SOLUCIÓN] Validar que fileName no contenga '..' con path.normalize() + validación
[PRIORIDAD] 🟡 Medio
```

---

### 6. PERFORMANCE

```
[ARCHIVO] Frontend/src/features/Macroprocess/public/hook/useManualMap.ts
[LINEA] 65
[PROBLEMA] Dependency array usa join(',') crea nueva referencia en cada render
[CODIGO_ACTUAL] }, [manualTypes.join(',')]);
[SOLUCIÓN] }, [JSON.stringify(manualTypes.sort())]); // O usar memoización previa
[PRIORIDAD] 🟡 Medio
```

```
[ARCHIVO] Backend/src/modules/systems/agreementPerson/agreementPerson.repository.ts
[LINEA] 162-181
[PROBLEMA] N+1 Query problem con relaciones anidadas
[SOLUCIÓN] Usar select específico de campos y considerar cursor-based pagination
[PRIORIDAD] 🟡 Medio
```

```
[ARCHIVO] Frontend/src/App.tsx
[LINEA] 15
[PROBLEMA] Múltiples useEffect con dependencias similares que podrían consolidarse
[SOLUCIÓN] Crear hook personalizado useDocumentMeta
[PRIORIDAD] 🟢 Bajo
```

---

### 7. TESTING

```
[ARCHIVO] Backend/src/modules/auth/auth.test.ts
[PROBLEMA] Solo existe 1 archivo de test. El resto de módulos no tienen cobertura.
[SOLUCIÓN] Agregar tests para: user.service, permission.service, role.service, etc.
[PRIORIDAD] 🟠 Alto
```

```
[ARCHIVO] Frontend
[PROBLEMA] No se encontraron archivos de test
[SOLUCIÓN] Agregar testing con Vitest + React Testing Library
[PRIORIDAD] 🟠 Alto
```

---

## ✍️ Hallazgos de Ortografía y Redacción

### 🔴 Errores Críticos (Visibles al Usuario)

```
[ARCHIVO] Frontend/src/features/Juristic/private/components/Edit.tsx
[TEXTO ORIGINAL] "La dispisición juridica fue editada correctamente"
[CORRECCIÓN] "La disposición jurídica fue editada correctamente"
[IMPACTO] UX | Profesionalismo
[PRIORIDAD] 🔴 Crítico
```

```
[ARCHIVO] Frontend/src/features/Juristic/private/components/Delete.tsx
[TEXTO ORIGINAL] "La dispoición juridica fue eliminada correctamente"
[CORRECCIÓN] "La disposición jurídica fue eliminada correctamente"
[IMPACTO] UX | Profesionalismo
[PRIORIDAD] 🔴 Crítico
```

```
[ARCHIVO] Frontend/src/features/Downloads/private/components/Areas/Edit.tsx
[TEXTO ORIGINAL] "El áerea fue editada correctamente"
[CORRECCIÓN] "El área fue editada correctamente"
[IMPACTO] UX | Profesionalismo
[PRIORIDAD] 🔴 Crítico
```

### 🟡 Errores en Consola/Logs

```
[ARCHIVO] Backend/prisma/seedInfo.ts:48
[TEXTO ORIGINAL] "Todas los sistemas cargadas correctamente"
[CORRECCIÓN] "Todos los sistemas cargados correctamente"
[IMPACTO] Claridad
```

```
[ARCHIVO] Backend/prisma/seedInfo.ts:232
[TEXTO ORIGINAL] "Todas las areas cargadas"
[CORRECCIÓN] "Todas las áreas cargadas"
[IMPACTO] Claridad
```

```
[ARCHIVO] Backend/prisma/seedInfo.ts:246
[TEXTO ORIGINAL] "Todas los manuales cargadas"
[CORRECCIÓN] "Todos los manuales cargados"
[IMPACTO] Claridad
```

```
[ARCHIVO] Backend/src/modules/directory/directory.repository.ts:87
[TEXTO ORIGINAL] "Error al obtener directorio telefonio"
[CORRECCIÓN] "Error al obtener directorio telefónico"
[IMPACTO] Claridad
```

```
[ARCHIVO] Frontend/src/features/Juristic/private/components/Add.tsx
[TEXTO ORIGINAL] "La disposición juridica fue creada correctamente"
[CORRECCIÓN] "La disposición jurídica fue creada correctamente"
[IMPACTO] UX
```

---

## 🧟 Código Muerto Detectado

```
[ARCHIVO] Backend/prisma/seedInfo.ts
[LINEA] 17
[TIPO] Código comentado
[PROBLEMA] // { name: "menu", value: menu } - Sin explicación
[SOLUCIÓN] Eliminar o documentar el porqué está comentado
[PRIORIDAD] 🟢 Bajo
```

```
[ARCHIVO] Frontend/src/features/Juristic/private/components/Edit.tsx
[LINEA] 61
[TIPO] Comentario residual
[PROBLEMA] // 104 lineas -> 87 lineas
[SOLUCIÓN] Eliminar comentario
[PRIORIDAD] 🟢 Bajo
```

```
[ARCHIVO] Backend/src/modules/certification/certification.service.ts
[LINEA] 132
[TIPO] Comentario residual
[PROBLEMA] // 169 lineas -> 152 lineas -> 133 lineas
[SOLUCIÓN] Eliminar comentario
[PRIORIDAD] 🟢 Bajo
```

```
[ARCHIVO] Frontend/src/layout/Layout.tsx
[LINEA] 3
[TIPO] Comentario innecesario
[PROBLEMA] import { useEffect, useState, useRef } from "react"; // Añadido useRef
[SOLUCIÓN] Eliminar comentario
[PRIORIDAD] 🟢 Bajo
```

---

## 📂 Problemas por Archivo

### Backend/src/modules/standards/standards.repository.ts
```
[LINEA] 257
[PROBLEMA] Typo: 'Standar' en lugar de 'Standard'
[CODIGO_ACTUAL] export const deleteStandarRepository
[SOLUCIÓN] export const deleteStandardRepository
[PRIORIDAD] 🟡 Medio
```

### Backend/src/modules/certification/certification.service.ts
```
[LINEA] 124
[PROBLEMA] Variable en PascalCase para constante
[CODIGO_ACTUAL] const Certification = await repo.getCertificationByIdRepository(id)
[SOLUCIÓN] const certification = await repo.getCertificationByIdRepository(id)
[PRIORIDAD] 🟢 Bajo
```

### Frontend/src/stores/createCrudStores.ts
```
[LINEA] 3-5, 9, 22
[PROBLEMA] Múltiples usos de 'any' en tipos genéricos
[SOLUCIÓN] Revisar tipado genérico y restringir con tipos más específicos
[PRIORIDAD] 🟡 Medio
```

---

## 🧩 Backlog SCRUM

### 📚 EPICS

| ID | EPIC | Descripción | SP Total |
|----|------|-------------|----------|
| EP-001 | **TypeScript Strict** | Eliminar usos de `any` y fortalecer tipado | 13 |
| EP-002 | **UX Professional** | Corregir errores ortográficos visibles al usuario | 8 |
| EP-003 | **CRUD Refactor** | Eliminar duplicación en componentes CRUD | 21 |
| EP-004 | **Testing Coverage** | Implementar testing Frontend y Backend | 34 |
| EP-005 | **Security Hardening** | Mejorar seguridad y manejo de tokens | 13 |
| EP-006 | **Code Quality** | Eliminar código muerto y estandarizar naming | 5 |

---

### 📌 USER STORIES

#### EPIC: TypeScript Strict (EP-001)

**US-001: Tipar agreementPerson.holders**
```
Como desarrollador
Quiero tipar el campo holders como AgreementPerson[] en lugar de any[]
Para evitar errores de tipo en runtime y mejorar la DX
```
- **Archivo**: `Frontend/src/features/Systems/private/types/agreementPerson.types.ts:10`
- **SP**: 2
- **Prioridad**: 🔴 Crítico

**US-002: Tipar seedConvenio data**
```
Como desarrollador
Quiero crear interfaces para los datos JSON en seedConvenio.ts
Para eliminar el uso de any[]
```
- **Archivos**: `Backend/prisma/seedConvenio.ts:11,30`
- **SP**: 3
- **Prioridad**: 🟡 Medio

**US-003: Tipar useManualMap hook**
```
Como desarrollador
Quiero reemplazar los tipos any en useManualMap por tipos específicos
Para mejorar la seguridad de tipos en el módulo Macroprocess
```
- **Archivo**: `Frontend/src/features/Macroprocess/public/hook/useManualMap.ts:29,51`
- **SP**: 2
- **Prioridad**: 🟡 Medio

**US-004: Tipar asyncHandler**
```
Como desarrollador
Quiero tipar correctamente el asyncHandler con tipos genéricos de Express
Para cumplir con SOLID y tener mejor inferencia de tipos
```
- **Archivo**: `Backend/src/utils/asyncHandler.ts:4`
- **SP**: 3
- **Prioridad**: 🟡 Medio

**US-005: Tipar createCrudApi Filters**
```
Como desarrollador
Quiero restringir el tipo Filters de createCrudApi
Para evitar aceptar cualquier valor en filtros
```
- **Archivo**: `Frontend/src/lib/createCrudApi.ts:13`
- **SP**: 3
- **Prioridad**: 🟡 Medio

---

#### EPIC: UX Professional (EP-002)

**US-006: Corregir errores en Juristic**
```
Como usuario
Quiero ver mensajes sin errores ortográficos en el módulo de Disposiciones Jurídicas
Para percibir profesionalismo en la aplicación
```
**TASKS:**
- Corregir `Frontend/src/features/Juristic/private/components/Edit.tsx:38`
  - "dispisición" → "disposición"
  - "juridica" → "jurídica" (2 veces)
- Corregir `Frontend/src/features/Juristic/private/components/Delete.tsx:27`
  - "dispoición" → "disposición"
  - "juridica" → "jurídica" (2 veces)
- Corregir `Frontend/src/features/Juristic/private/components/Add.tsx:39`
  - "juridica" → "jurídica"
- **SP**: 3
- **Prioridad**: 🔴 Crítico

**US-007: Corregir error en Downloads Areas**
```
Como usuario
Quiero ver el mensaje correcto al editar áreas
Para entender correctamente el resultado de la operación
```
- **Archivo**: `Frontend/src/features/Downloads/private/components/Areas/Edit.tsx:31`
- "áerea" → "área"
- **SP**: 1
- **Prioridad**: 🔴 Crítico

**US-008: Corregir mensajes de seed**
```
Como desarrollador
Quiero ver mensajes de consola correctamente escritos
Para tener claridad durante el desarrollo
```
**TASKS:**
- `Backend/prisma/seedInfo.ts:48` - "Todas los sistemas cargadas" → "Todos los sistemas cargados"
- `Backend/prisma/seedInfo.ts:232` - "areas" → "áreas"
- `Backend/prisma/seedInfo.ts:246` - "Todas los manuales cargadas" → "Todos los manuales cargados"
- `Backend/prisma/seedInfo.ts:283` - "Codigos" → "Códigos"
- **SP**: 2
- **Prioridad**: 🟢 Bajo

**US-009: Corregir error en repository**
```
Como desarrollador
Quiero ver errores correctamente escritos en los logs
Para depurar problemas más fácilmente
```
- **Archivo**: `Backend/src/modules/directory/directory.repository.ts:87`
- "telefonio" → "telefónico"
- **SP**: 1
- **Prioridad**: 🟡 Medio

**US-010: Renombrar deleteStandarRepository**
```
Como desarrollador
Quiero que las funciones estén correctamente escritas
Para mantener consistencia y profesionalismo
```
- **Archivo**: `Backend/src/modules/standards/standards.repository.ts:257`
- "deleteStandarRepository" → "deleteStandardRepository"
- **SP**: 1
- **Prioridad**: 🟡 Medio

---

#### EPIC: CRUD Refactor (EP-003)

**US-011: Crear componentes CRUD genéricos**
```
Como desarrollador
Quiero componentes CRUD reutilizables para eliminar duplicación
Para facilitar el mantenimiento y reducir inconsistencias
```
**TASKS:**
- Crear `Frontend/src/components/Crud/CrudForm.tsx` - Componente genérico de formulario
- Crear `Frontend/src/components/Crud/CrudAddDialog.tsx` - Diálogo de creación genérico
- Crear `Frontend/src/components/Crud/CrudEditDialog.tsx` - Diálogo de edición genérico
- Crear `Frontend/src/components/Crud/CrudDeleteDialog.tsx` - Diálogo de eliminación genérico
- Crear `Frontend/src/hooks/useCrudSubmit.ts` - Hook para manejo de submits
- **SP**: 13
- **Prioridad**: 🟠 Alto

**US-012: Refactorizar Certification con componentes genéricos**
```
Como desarrollador
Quiero migrar el módulo Certification a usar componentes CRUD genéricos
Para validar la utilidad de los componentes creados
```
- **Archivos**: `Frontend/src/features/Certification/private/components/*`
- **SP**: 5
- **Prioridad**: 🟡 Medio

**US-013: Refactorizar Juristic con componentes genéricos**
```
Como desarrollador
Quiero migrar el módulo Juristic a usar componentes CRUD genéricos
Para reducir duplicación de código
```
- **Archivos**: `Frontend/src/features/Juristic/private/components/*`
- **SP**: 3
- **Prioridad**: 🟡 Medio

---

#### EPIC: Testing Coverage (EP-004)

**US-014: Setup testing Frontend**
```
Como desarrollador
Quiero configurar Vitest + React Testing Library en el Frontend
Para poder escribir tests unitarios y de integración
```
**TASKS:**
- Instalar dependencias: vitest, @testing-library/react, @testing-library/jest-dom
- Configurar `vite.config.ts` para soporte de tests
- Crear script `test` en package.json
- Crear ejemplo de test básico
- **SP**: 5
- **Prioridad**: 🟠 Alto

**US-015: Tests para Auth Store**
```
Como desarrollador
Quiero tests unitarios para el Auth Store
Para asegurar el correcto manejo de autenticación
```
- **Archivo**: `Frontend/src/features/auth/store/Auth.tsx`
- **SP**: 5
- **Prioridad**: 🟠 Alto

**US-016: Tests para useCrudStore**
```
Como desarrollador
Quiero tests para el hook useCrudStore
Para validar operaciones CRUD en stores
```
- **Archivo**: `Frontend/src/stores/createCrudStores.ts`
- **SP**: 8
- **Prioridad**: 🟡 Medio

**US-017: Tests para servicios Backend**
```
Como desarrollador
Quiero tests para los servicios del Backend
Para asegurar la lógica de negocio
```
**TASKS:**
- Crear `Backend/src/modules/users/user.service.test.ts`
- Crear `Backend/src/modules/permissions/permission.service.test.ts`
- Crear `Backend/src/modules/roles/role.service.test.ts`
- **SP**: 13
- **Prioridad**: 🟠 Alto

**US-018: Tests E2E críticos**
```
Como QA
Quiero tests end-to-end para flujos críticos
Para detectar regresiones en funcionalidad principal
```
- **SP**: 8
- **Prioridad**: 🟡 Medio

---

#### EPIC: Security Hardening (EP-005)

**US-019: Migrar tokens a httpOnly cookies**
```
Como arquitecto de seguridad
Quiero migrar el almacenamiento de tokens de localStorage a httpOnly cookies
Para proteger contra ataques XSS
```
**TASKS:**
- Modificar `Backend/src/modules/auth/jwt.ts` para usar cookies
- Modificar `Frontend/src/features/auth/store/Auth.tsx` para leer cookies
- Actualizar middleware de auth para leer cookies
- **SP**: 8
- **Prioridad**: 🟠 Alto

**US-020: Sanitizar paths de archivos**
```
Como desarrollador
Quiero sanitizar los paths de archivos en el servicio de files
Para prevenir path traversal attacks
```
- **Archivo**: `Backend/src/modules/files/files.service.ts`
- **SP**: 3
- **Prioridad**: 🟡 Medio

**US-021: Extraer DUMMY_HASH a variables de entorno**
```
Como desarrollador
Quiero extraer el DUMMY_HASH del código fuente a variables de entorno
Para mejorar la seguridad y configurabilidad
```
- **Archivo**: `Backend/src/modules/auth/auth.service.ts:6`
- **SP**: 2
- **Prioridad**: 🟢 Bajo

---

#### EPIC: Code Quality (EP-006)

**US-022: Eliminar código comentado residual**
```
Como desarrollador
Quiero limpiar los comentarios residuales de refactorización
Para mantener el código limpio y profesional
```
**TASKS:**
- Eliminar comentario en `Backend/prisma/seedInfo.ts:17`
- Eliminar comentario en `Frontend/src/features/Juristic/private/components/Edit.tsx:61`
- Eliminar comentario en `Backend/src/modules/certification/certification.service.ts:132`
- Eliminar comentario en `Frontend/src/layout/Layout.tsx:3`
- **SP**: 1
- **Prioridad**: 🟢 Bajo

**US-023: Estandarizar naming conventions**
```
Como desarrollador
Quiero estandarizar el naming a camelCase en todo el proyecto
Para mantener consistencia
```
**TASKS:**
- Renombrar `public_path` → `publicPath` en `Backend/src/app.ts:51`
- Renombrar `Certification` → `certification` en `Backend/src/modules/certification/certification.service.ts:124`
- **SP**: 2
- **Prioridad**: 🟢 Bajo

**US-024: Consolidar useEffect en App.tsx**
```
Como desarrollador
Quiero consolidar los múltiples useEffect en App.tsx
Para mejorar la legibilidad y mantenibilidad
```
- **Archivo**: `Frontend/src/App.tsx`
- **SP**: 2
- **Prioridad**: 🟢 Bajo

---

## 🗂️ Sprint Planning

### 🚀 Sprint 1 - Calidad Inmediata (Semana 1-2)

**Objetivo**: Corregir errores visibles al usuario y críticos de seguridad

| Story | Tarea | SP | Asignado |
|-------|-------|----|----------|
| US-006 | Corregir errores ortográficos en Juristic | 3 | Dev 1 |
| US-007 | Corregir error en Downloads Areas | 1 | Dev 1 |
| US-009 | Corregir error en repository | 1 | Dev 1 |
| US-001 | Tipar agreementPerson.holders | 2 | Dev 2 |
| US-019 | Migrar tokens a httpOnly cookies | 8 | Dev 2 |

**Total SP**: 15
**Capacidad equipo**: 20 SP
**Buffer**: 5 SP para imprevistos

---

### 🔄 Sprint 2 - Refactorización Core (Semana 3-4)

**Objetivo**: Eliminar duplicación y mejorar tipado

| Story | Tarea | SP | Asignado |
|-------|-------|----|----------|
| US-011 | Crear componentes CRUD genéricos | 13 | Dev 1 |
| US-004 | Tipar asyncHandler | 3 | Dev 2 |
| US-002 | Tipar seedConvenio data | 3 | Dev 2 |
| US-008 | Corregir mensajes de seed | 2 | Dev 2 |
| US-022 | Eliminar código comentado residual | 1 | Dev 2 |

**Total SP**: 22
**Capacidad equipo**: 20 SP
**Ajuste**: Mover US-022 a Sprint 3 si es necesario

---

### 🧪 Sprint 3 - Testing & Calidad (Semana 5-6)

**Objetivo**: Establecer base de testing y completar mejoras

| Story | Tarea | SP | Asignado |
|-------|-------|----|----------|
| US-014 | Setup testing Frontend | 5 | Dev 1 |
| US-015 | Tests para Auth Store | 5 | Dev 1 |
| US-012 | Refactorizar Certification | 5 | Dev 2 |
| US-017 | Tests para servicios Backend (inicio) | 5 | Dev 2 |
| US-020 | Sanitizar paths de archivos | 3 | Dev 2 |
| US-010 | Renombrar deleteStandarRepository | 1 | Dev 1 |

**Total SP**: 24
**Capacidad equipo**: 20 SP
**Ajuste**: Priorizar tests sobre refactorización si hay dependencias

---

## 🛠️ Plan de Refactorización

### Fase 1: Correcciones Inmediatas (Sprint 1)

**Qué cambiar primero:**
1. **Errores ortográficos** en mensajes de usuario (Juristic, Downloads)
2. **Seguridad**: Migrar tokens de localStorage a cookies

**Riesgos:**
- Cambios en autenticación pueden afectar toda la aplicación
- Requiere coordinación Backend + Frontend

**Validación:**
- Tests de autenticación existentes deben pasar
- Revisión manual de mensajes corregidos

### Fase 2: Consolidación (Sprint 2)

**Qué cambiar:**
1. Crear componentes CRUD genéricos (base para el resto)
2. Tipado estricto (eliminar `any`)
3. Limpieza de código muerto

**Dependencias:**
- Los componentes genéricos deben estar listos antes de refactorizar módulos
- Tipado antes de crear tests (mejor cobertura de tipos)

**Riesgos:**
- Componentes genéricos pueden no cubrir todos los casos edge
- Requiere validación exhaustiva

### Fase 3: Testing (Sprint 3+)

**Qué cambiar:**
1. Setup de testing (Vitest + React Testing Library)
2. Tests de stores críticos
3. Tests de servicios Backend

**Dependencias:**
- Requiere código estable de las fases anteriores
- Mejor hacer tests después de refactorizar CRUDs

---

## 📈 Score del Proyecto

| Categoría | Score (1-10) | Justificación |
|-----------|--------------|---------------|
| **Arquitectura** | 8 | Buena separación de responsabilidades, patrones DDD/FSD bien aplicados |
| **Mantenibilidad** | 6 | Alto código duplicado en CRUDs, pero estructura clara |
| **Escalabilidad** | 7 | Patrones factory permiten extensión, pero necesita tests |
| **Seguridad** | 6 | Tokens en localStorage (-2), falta sanitización de paths (-1), bien en auth |
| **Calidad TypeScript** | 7 | Pocos `any`, pero asyncHandler sin tipar y algunos tipos débiles |
| **Documentación/Ortografía** | 5 | Errores ortográficos visibles al usuario (-3), inconsistencias en logs (-2) |
| **Testing** | 2 | Solo 1 archivo de test existente |

### Score Promedio: **5.8 / 10**

---

## 🚀 Recomendaciones Finales

### Inmediatas (Esta semana)
1. ✅ **Corregir errores ortográficos** en Juristic y Downloads - Impacto inmediato en percepción de calidad
2. ✅ **Priorizar migración de tokens** a httpOnly cookies - Riesgo de seguridad actual

### Corto Plazo (Próximo mes)
3. 🔧 **Crear componentes CRUD genéricos** - Reducirá drásticamente la deuda técnica
4. 🔧 **Eliminar usos de `any`** - Mejorará la DX y prevenirá bugs
5. 🔧 **Setup de testing** - Necesario para refactorizaciones seguras

### Mediano Plazo (Próximos 2-3 meses)
6. 📈 **Alcanzar 70% de cobertura de tests**
7. 📈 **Implementar tests E2E** para flujos críticos
8. 📈 **Documentar la arquitectura** con ADRs (Architecture Decision Records)

### Notas para el Equipo
- El proyecto tiene una **base arquitectónica sólida** - no requiere reescritura
- El **patrón CRUD factory** es inteligente pero necesita abstracción adicional
- **Los errores ortográficos** deben ser prioridad por impacto en UX
- Con **2-3 sprints de trabajo enfocado**, el score puede subir a 8+/10

---

## 📋 Checklist de Acción

```markdown
## Pre-Sprint
- [ ] Review de este documento con el equipo
- [ ] Asignar owners a cada Epic
- [ ] Configurar herramientas de seguimiento (Jira/Linear/etc)

## Sprint 1
- [ ] US-006: Correcciones Juristic
- [ ] US-007: Corrección Downloads Areas
- [ ] US-001: Tipar holders
- [ ] US-019: Migrar tokens (spike primero)

## Sprint 2
- [ ] US-011: Componentes CRUD genéricos
- [ ] US-004: Tipar asyncHandler
- [ ] US-002: Tipar seedConvenio

## Sprint 3
- [ ] US-014: Setup testing Frontend
- [ ] US-015: Tests Auth Store
- [ ] US-012: Refactor Certification
```

---

## 📎 Referencias

- **Repositorio**: Blog (Fullstack TypeScript)
- **Backend**: Express + Prisma + TypeScript
- **Frontend**: React + Vite + Mantine UI + Zustand
- **Auditoría realizada**: 2026-04-09
- **Auditor**: Arquitecto de Software Senior

---

*Este documento es un trabajo vivo. Actualizar después de cada sprint completado para reflejar el progreso.*

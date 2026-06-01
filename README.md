# SIGDEM-ML
## Sistema Inteligente de Gestión Documental, Trámites y Selección de Personal mediante Machine Learning

---

## 📝 1. Descripción General y Objetivos

### Descripción General
**SIGDEM-ML** es una plataforma web desarrollada para modernizar los procesos administrativos de una municipalidad mediante la automatización de trámites, gestión documental inteligente y análisis de currículos utilizando técnicas de **Machine Learning (ML)** y **Procesamiento de Lenguaje Natural (NLP)**.

El sistema nace como respuesta a los problemas de gestión manual presentes en muchas entidades públicas, donde los tiempos de atención son elevados, existen errores frecuentes en el procesamiento de solicitudes y se carece de herramientas tecnológicas que permitan optimizar la toma de decisiones. 

SIGDEM-ML integra diferentes módulos especializados que permiten administrar trámites municipales, documentos digitales, convocatorias laborales y procesos de selección de personal utilizando algoritmos inteligentes para mejorar la eficiencia institucional.

### 🎯 Objetivo del Proyecto
Desarrollar una plataforma integral que permita:
* **Digitalizar** la gestión documental municipal.
* **Optimizar** el procesamiento de trámites administrativos.
* **Reducir** los tiempos de atención al ciudadano.
* **Mejorar** la trazabilidad completa de las solicitudes.
* **Automatizar** el envío de notificaciones.
* **Priorizar** trámites mediante modelos de Machine Learning.
* **Analizar** currículos utilizando Procesamiento de Lenguaje Natural (NLP).
* **Generar** rankings automáticos de candidatos idóneos.
* **Facilitar** la toma de decisiones estratégicas mediante indicadores y reportes.

### ⚠️ Problemática Actual
La *Municipalidad Provincial de Yau* presenta las siguientes deficiencias en su gestión:
1. Procesos administrativos netamente manuales.
2. Demoras significativas en la atención de trámites.
3. Falta de seguimiento y monitoreo en tiempo real.
4. Escasa o nula trazabilidad documental.
5. Ausencia de herramientas analíticas para la toma de decisiones.
6. Procesos de selección de personal lentos y poco automatizados.
7. Limitada capacidad para identificar y priorizar solicitudes urgentes o críticas.

---

## 🛠️ 2. Tecnologías Utilizadas

El sistema emplea un stack moderno, robusto y escalable dividido en tres capas principales:

### 💻 Frontend
* **Core:** React, TypeScript, Vite
* **Enrutado y Estado:** React Router DOM, TanStack Query (React Query), Zustand
* **Estilos y Animaciones:** Tailwind CSS, Framer Motion, Lucide React (Iconos)
* **Formularios y Validación:** React Hook Form, Zod
* **Visualización de Datos:** Recharts
* **Notificaciones:** Sonner

### ⚙️ Backend
* **Framework:** FastAPI (Python)
* **ORM & Base de Datos:** SQLAlchemy, PostgreSQL
* **Seguridad:** JWT Authentication (JSON Web Tokens), Pydantic (Validación de datos)

### 🧠 Inteligencia Artificial
* **Machine Learning:** * *Algoritmo:* Random Forest Classifier
    * *Uso:* Clasificación de prioridades de trámites, predicción de solicitudes críticas y optimización del flujo de atención.
* **Procesamiento de Lenguaje Natural (NLP):**
    * *Técnicas:* TF-IDF (Term Frequency-Inverse Document Frequency), Cosine Similarity (Similitud Coseno)
    * *Uso:* Extracción de información de CVs, comparación entre currículos y requerimientos de convocatorias, y generación del ranking automático de candidatos.

---

## 🏗️ 3. Arquitectura del Sistema y Módulos Principales

El sistema está basado en una **arquitectura modular escalable**, compuesta por los siguientes componentes:

### 🔒 Módulo de Autenticación
* **Funciones:** Login, Logout, Refresh Token y gestión del Perfil de usuario.
* **Seguridad:** Endpoints y rutas protegidas mediante tokens JWT.

### 📊 Dashboard Ejecutivo
* **Indicadores Institucionales:** Centraliza métricas clave en tiempo real:
    * Total de usuarios, trámites, documentos, convocatorias y CVs recibidos.
* **Componentes Visuales:** Gráficos estadísticos interactivos:
    * *Pie Chart* (Gráfico de pastel)
    * *Bar Chart* (Gráfico de barras)
    * *Area Chart* (Gráfico de área)
    * *Line Chart* (Gráfico de líneas)

### 👥 Gestión de Usuarios
* **Administración:** Control completo de usuarios internos.
* **Operaciones:** Crear, editar, activar, desactivar y eliminar usuarios.
* **Roles del Sistema:** `ADMIN`, `RECEPCIONISTA`, `ANALISTA`, `RRHH`.

### 📂 Gestión de Trámites
* **Estados del Trámite:** `REGISTRADO` ➡️ `EN_REVISION` ➡️ `OBSERVADO` ➡️ `APROBADO` / `RECHAZADO` ➡️ `FINALIZADO`.
* **Niveles de Prioridad:** `BAJA`, `MEDIA`, `ALTA`, `CRITICA`.
* **Funciones:** Registro de solicitudes, seguimiento en tiempo real, asignación de analistas responsables, historial detallado de acciones y cambio de estados.

### 🗄️ Gestión Documental
* **Repositorio Digital:** Almacenamiento seguro de archivos digitales.
* **Funciones Avanzadas:** Subida y descarga de archivos, procesamiento **OCR** (Reconocimiento Óptico de Caracteres) para extracción de texto y asociación directa de documentos a sus respectivos trámites.

### 🤖 Machine Learning para Trámites
* **Modelo:** Random Forest.
* **Funciones:** Entrenamiento del modelo desde la interfaz, visualización de métricas de rendimiento, clasificación manual y predicción automática de prioridades.
* **Indicadores de Calidad:** *Accuracy*, *Precision*, *Recall* y *F1 Score*.

### 👔 Recursos Humanos y Convocatorias
* **Gestión de Convocatorias:** Crear, editar, filtrar y eliminar convocatorias laborales.
* **Estados de Convocatoria:** `ABIERTA`, `PAUSADA`, `CERRADA`.

### 📄 Gestión de Currículos
* **Administración:** Carga masiva o individual de archivos de CVs, extracción automatizada de texto, asociación de candidatos a convocatorias específicas y gestión del estado del postulante.

### 🔬 NLP para Selección de Personal
* **Análisis Comparativo:** Contraste automático entre las exigencias de la Convocatoria y el perfil del CV (usando TF-IDF y Similitud Coseno).
* **Resultados:** Cálculo de compatibilidad porcentual, análisis automático de habilidades y clasificación predictiva de candidatos.

### 🏆 Ranking Inteligente de Candidatos
* **Generación Automática:** Listado priorizado con el *Top de candidatos*, porcentaje exacto de compatibilidad, perfil resumido extraído y herramientas de comparación visual entre postulantes.

### ✉️ Centro de Notificaciones
* **Gestión de Correos:** Envío manual, reenvío, seguimiento y auditoría de comunicaciones institucionales.
* **Estados de Envío:** `PENDIENTE`, `ENVIADO`, `FALLIDO`, `SIMULADO`.

### 📈 Reportes Institucionales
* **Módulos Soportados:** Trámites, Documentos, Recursos Humanos y Notificaciones.
* **Formatos de Exportación:** `JSON` y `PDF` listos para impresión.

---

## 🛡️ 4. Sistema de Seguridad (RBAC)

Implementación estricta de **RBAC (Role-Based Access Control)** para asegurar la integridad de los datos.

### Características de Seguridad
* **Protected Routes & Role Guards:** Restricción de acceso a nivel de ruteo en el Frontend.
* **Permission Guards:** Validación de permisos en el Backend por cada endpoint.
* **Sidebar Dinámico:** Los menús de navegación se adaptan según el rol del usuario conectado.
* **Granularidad:** Control de acceso detallado por módulo y por acción específica.

### Matriz de Permisos por Rol

| Rol | Módulos con Acceso |
| :--- | :--- |
| **ADMIN** | 🟢 Acceso total e irrestricto a todo el sistema. |
| **RECEPCIONISTA** | Dashboard, Trámites, Documentos, Notificaciones. |
| **ANALISTA** | Dashboard, Trámites, Machine Learning, Reportes, Notificaciones. |
| **RRHH** | Dashboard, Recursos Humanos (Convocatorias), CVs, NLP, Ranking, Reportes, Notificaciones. |

---

## ✨ 5. Características Destacadas y Beneficios

### Características Principales
* ✅ Gestión documental inteligente con soporte OCR.
* ✅ Modelos de Machine Learning operativos (Random Forest).
* ✅ Procesamiento avanzado de CVs mediante técnicas de NLP.
* ✅ Ranking automático y objetivo de candidatos por compatibilidad.
* ✅ Dashboard ejecutivo con gráficos estadísticos interactivos.
* ✅ Generación nativa de reportes en formato PDF.
* ✅ Control de acceso robusto basado en roles (RBAC).
* ✅ Arquitectura de software escalable y modular.
* ✅ Interfaz de usuario moderna, intuitiva y 100% responsive.
* ✅ Centro de notificaciones automáticas integrado.

### 📈 Beneficios Institucionales
* Reducción drástica de los tiempos de atención en trámites ciudadanos.
* Incremento notable en la productividad del personal municipal.
* Mayor transparencia y trazabilidad en la administración pública.
* Minimización de errores humanos gracias a la automatización inteligente.
* Mejor experiencia de servicio y satisfacción para los ciudadanos.
* Optimización de los recursos financieros y operativos de la municipalidad.
* Toma de decisiones institucionales respaldada por analítica de datos.

---

## 🚀 6. Futuras Mejoras

Para garantizar la evolución continua de la plataforma, se contemplan las siguientes integraciones:
* [ ] Integración oficial con sistemas de **firma digital**.
* [ ] Conexión mediante API con entidades del estado (**RENIEC** y **SUNAT**).
* [ ] Implementación de alertas y notificaciones vía **SMS** y **WhatsApp Business**.
* [ ] Migración hacia modelos NLP basados en **Transformers** (ej. **BERT**) para análisis semántico avanzado de documentos y currículos.
* [ ] Módulo de Business Intelligence (**BI**) avanzado con exportación directa a Excel y Power BI.
* [ ] Incorporación de un **Sistema de Auditoría Institucional** exhaustivo (Logs detallados de operaciones).

---

## 👤 Información del Proyecto
* **Autor:** Proyecto académico desarrollado para **SENATI**.
* **Copyright:** SIGDEM-ML © 2026
* **Propósito:** Sistema Inteligente de Gestión Documental y Machine Learning para Municipalidades.
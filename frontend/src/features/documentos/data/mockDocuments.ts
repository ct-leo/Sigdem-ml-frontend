import type { Document } from "../types/document.types";

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-001",
    code: "EXP-2026-LC-08912",
    name: "Licencia Comercial - Restaurant El Portalon.pdf",
    type: "PDF",
    size: 2450000, // 2.45 MB
    uploadedAt: "2026-05-28T09:15:30Z",
    responsibleArea: "Desarrollo Económico",
    owner: {
      name: "Dra. Valeria Mendoza",
      role: "Especialista en Licencias",
      area: "Subgerencia de Comercialización",
    },
    statusOcr: "Procesado",
    procedureCode: "TRAM-2026-9812",
    metadata: {
      sizeFormatted: "2.45 MB",
      pages: 4,
      ocrAccuracy: 98.4,
      processedAt: "2026-05-28T09:17:12Z",
      ocrText: `MUNICIPALIDAD METROPOLITANA - SUBGERENCIA DE COMERCIALIZACIÓN
LICENCIA DE FUNCIONAMIENTO N° 008912-2026
Por la presente se autoriza el funcionamiento del establecimiento comercial:
RAZÓN SOCIAL: INVERSIONES EL PORTALÓN S.A.C.
NOMBRE COMERCIAL: RESTAURANT EL PORTALÓN
GIRO: Restaurante y Venta de Bebidas Alcohólicas Acompañantes.
DIRECCIÓN: Av. Larco 452, Primer Piso.
R.U.C.: 20601245891
AFORO MÁXIMO: 80 Personas.
VIGENCIA: Indeterminada.
Dado a los 28 días del mes de Mayo del año 2026.
Firma y Sello de la Gerencia de Desarrollo Económico.`,
      downloadUrl: "#",
    },
  },
  {
    id: "doc-002",
    code: "EXP-2026-PC-44102",
    name: "Permiso Construccion - Edificio Multiresidencial.docx",
    type: "DOCX",
    size: 1540000, // 1.54 MB
    uploadedAt: "2026-05-29T14:30:00Z",
    responsibleArea: "Desarrollo Urbano",
    owner: {
      name: "Ing. Carlos Villalta",
      role: "Supervisor de Obras Privadas",
      area: "Gerencia de Desarrollo Urbano",
    },
    statusOcr: "Pendiente",
    procedureCode: "TRAM-2026-1044",
    metadata: {
      sizeFormatted: "1.54 MB",
      pages: 12,
      downloadUrl: "#",
    },
  },
  {
    id: "doc-003",
    code: "EXP-2026-RC-00561",
    name: "Reclamo Ciudadano - Ruidos Molestos Pub Nocturno.pdf",
    type: "PDF",
    size: 780000, // 780 KB
    uploadedAt: "2026-05-30T10:05:00Z",
    responsibleArea: "Seguridad Ciudadana",
    owner: {
      name: "Lic. Martín Sotomayor",
      role: "Coordinador de Vecinos",
      area: "Subgerencia de Fiscalización",
    },
    statusOcr: "Procesado",
    procedureCode: "TRAM-2026-2099",
    metadata: {
      sizeFormatted: "780 KB",
      pages: 2,
      ocrAccuracy: 95.1,
      processedAt: "2026-05-30T10:08:44Z",
      ocrText: `EXPEDIENTE DE DENUNCIA VECINAL - RUIDOS MOLESTOS
Señor Alcalde de la Municipalidad,
Quienes suscriben, vecinos de la cuadra 8 de la Calle San Martín, nos dirigimos a usted para denunciar formalmente al local "Bar Rock & Beer" ubicado en San Martín 840, por emitir ruidos molestos que exceden los límites máximos permitidos en zona residencial durante altas horas de la madrugada (superando los 85dB constatados preliminarmente).
Solicitamos la intervención de Fiscalización y Control.
Adjuntamos firmas de los vecinos afectados.
Fecha: 30 de Mayo de 2026.`,
      downloadUrl: "#",
    },
  },
  {
    id: "doc-004",
    code: "EXP-2026-DC-23091",
    name: "Certificado Defensa Civil - Centro Comercial Plaza.pdf",
    type: "PDF",
    size: 3120000, // 3.12 MB
    uploadedAt: "2026-05-27T08:00:00Z",
    responsibleArea: "Gestión del Riesgo",
    owner: {
      name: "Ing. Roxana Benavides",
      role: "Inspector Técnico ITSE",
      area: "Subgerencia de Gestión del Riesgo de Desastres",
    },
    statusOcr: "Procesado",
    procedureCode: "TRAM-2026-8840",
    metadata: {
      sizeFormatted: "3.12 MB",
      pages: 5,
      ocrAccuracy: 99.8,
      processedAt: "2026-05-27T08:05:12Z",
      ocrText: `MUNICIPALIDAD - INSPECCIÓN TÉCNICA DE SEGURIDAD EN EDIFICACIONES (ITSE)
CERTIFICADO DE SEGURIDAD N° 2026-00023091
Establecimiento: CENTRO COMERCIAL PLAZA NORTE
Dirección: Av. Tomas Valle N° 1200
Clasificación de Riesgo: RIESGO MEDIO
Cumple satisfactoriamente con las normas de seguridad vigentes según el Reglamento Nacional de Edificaciones. Cuenta con extintores operativos, señalización adecuada, luces de emergencia y plan de contingencia actualizado.
Fecha de Emisión: 27 de Mayo de 2026.
Válido hasta: 27 de Mayo de 2028.`,
      downloadUrl: "#",
    },
  },
  {
    id: "doc-005",
    code: "EXP-2026-EX-11045",
    name: "Solicitud Exoneracion Impuestos Prediales.xlsx",
    type: "XLSX",
    size: 450000, // 450 KB
    uploadedAt: "2026-05-31T07:20:00Z",
    responsibleArea: "Administración Tributaria",
    owner: {
      name: "Lic. Manuel Ortiz",
      role: "Liquidador Tributario",
      area: "Gerencia de Administración Tributaria",
    },
    statusOcr: "Error",
    procedureCode: "TRAM-2026-3022",
    metadata: {
      sizeFormatted: "450 KB",
      processedAt: "2026-05-31T07:22:15Z",
      ocrText: "ERROR: Formato XLSX no estructurado para procesamiento OCR OCR-TEXT-EXTRACTION-FAILED.",
      downloadUrl: "#",
    },
  },
  {
    id: "doc-006",
    code: "EXP-2026-PL-00918",
    name: "Plano Catastral - Sector Urbano 4.jpg",
    type: "JPG",
    size: 5800000, // 5.8 MB
    uploadedAt: "2026-05-25T11:45:00Z",
    responsibleArea: "Desarrollo Urbano",
    owner: {
      name: "Ing. Carlos Villalta",
      role: "Supervisor de Obras Privadas",
      area: "Gerencia de Desarrollo Urbano",
    },
    statusOcr: "En Proceso",
    procedureCode: "TRAM-2026-0411",
    metadata: {
      sizeFormatted: "5.8 MB",
      pages: 1,
      downloadUrl: "#",
    },
  },
  {
    id: "doc-007",
    code: "EXP-2026-AI-88301",
    name: "Acta Inspeccion Obras Ambientales.png",
    type: "PNG",
    size: 1900000, // 1.9 MB
    uploadedAt: "2026-05-26T16:10:00Z",
    responsibleArea: "Servicios a la Ciudad",
    owner: {
      name: "Dra. Valeria Mendoza",
      role: "Especialista en Licencias",
      area: "Subgerencia de Comercialización",
    },
    statusOcr: "Procesado",
    procedureCode: "TRAM-2026-5122",
    metadata: {
      sizeFormatted: "1.9 MB",
      pages: 1,
      ocrAccuracy: 92.4,
      processedAt: "2026-05-26T16:15:30Z",
      ocrText: `MUNICIPALIDAD - DIRECCIÓN DE FISCALIZACIÓN AMBIENTAL
ACTA DE INSPECCIÓN N° 0088301-2026
En la fecha se constató la zona de amortiguamiento del Parque Municipal N° 3.
Se detectó vertido indebido de desmonte de construcción en áreas verdes públicas por parte del contratista "Obras Civiles S.A.".
Se procede a levantar la multa respectiva según ordenanza municipal N° 450.
Inspector de Campo: Ing. Alberto Ruiz.
Fecha: 26 de Mayo de 2026.`,
      downloadUrl: "#",
    },
  }
];

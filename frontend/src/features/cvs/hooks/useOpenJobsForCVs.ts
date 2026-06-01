/**
 * useOpenJobsForCVs
 *
 * Re-exports useOpenJobs from the RRHH module to be consumed by
 * the CVs module (UploadCVModal, filters, etc.) without creating
 * circular dependencies.  Only jobs with estado === "ABIERTA" are returned.
 */
export { useOpenJobs as useOpenJobsForCVs } from "../../rrhh/hooks/useJobs";

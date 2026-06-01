import { useTramitesReport } from "./useTramitesReport";
import { useDocumentsReport } from "./useDocumentsReport";
import { useRRHHReport } from "./useRRHHReport";
import { useNotificationsReport } from "./useNotificationsReport";

export const useReportsDashboard = () => {
  const tramites = useTramitesReport();
  const documents = useDocumentsReport();
  const rrhh = useRRHHReport();
  const notifications = useNotificationsReport();

  const isLoading =
    tramites.isLoading ||
    documents.isLoading ||
    rrhh.isLoading ||
    notifications.isLoading;

  const isError =
    tramites.isError ||
    documents.isError ||
    rrhh.isError ||
    notifications.isError;

  const isSuccess =
    tramites.isSuccess &&
    documents.isSuccess &&
    rrhh.isSuccess &&
    notifications.isSuccess;

  return {
    tramites,
    documents,
    rrhh,
    notifications,
    isLoading,
    isError,
    isSuccess,
    refetchAll: () => {
      tramites.refetch();
      documents.refetch();
      rrhh.refetch();
      notifications.refetch();
    },
  };
};
export default useReportsDashboard;

export const DOCUMENTS_KEYS = {
  all: ["documents"],
  list: ["documents", "list"],
  detail: (id: number) => ["documents", id],
  tramite: (tramiteId: number) => ["documents", "tramite", tramiteId],
};

export const TRAMITES_KEYS = {
  all: ["tramites"],
  list: ["tramites", "list"],
  detail: (id: number) => ["tramites", id],
  history: (id: number) => ["tramites", id, "history"],
};

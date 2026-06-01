export const NOTIFICATIONS_KEYS = {
  all: ["notifications"],

  list: ["notifications", "list"],

  detail: (id: number) => [
    "notifications",
    id,
  ],

  tramite: (tramiteId: number) => [
    "notifications",
    "tramite",
    tramiteId,
  ],
};
export default NOTIFICATIONS_KEYS;

export const MUNICIPAL_COLORS = {
  navyBlue: "#163B70",
  goldenSand: "#D4AA45",
  municipalGreen: "#749763",
  dangerRed: "#DC2626",
  orangeAlert: "#EA580C",
  slateGray: "#6B7280",
} as const;

export const CHART_FALLBACKS = {
  monthlyEvolution: [
    { name: "Ene", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Abr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Ago", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dic", total: 0 },
  ],
  workload: [
    { name: "Lun", carga: 0 },
    { name: "Mar", carga: 0 },
    { name: "Mie", carga: 0 },
    { name: "Jue", carga: 0 },
    { name: "Vie", carga: 0 },
    { name: "Sab", carga: 0 },
    { name: "Dom", carga: 0 },
  ],
};
export default MUNICIPAL_COLORS;

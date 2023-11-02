export type AllStatsType = {
   name: string;
   color: string;
   light_color: string;
}
export const allStats: AllStatsType[] = [
  { name: "hp", color: "#00CA6E", light_color: "#c9fde6" },
  { name: "attack", color: "#FF0000", light_color: "#ffbdbd" },
  { name: "defense", color: "#4B49F4", light_color: "#c4c3f9" },
  { name: "special-attack", color: "#D54600", light_color: "#f9d1be" },
  { name: "special-defense", color: "#7F00FF", light_color: "#dbbef9" },
  { name: "speed", color: "#FFC200", light_color: "#ffedb3" },
  { name: "accuracy", color: "#CB85BC", light_color: "#eccae5" },
  { name: "evasion", color: "#899CAF", light_color: "#ddedfd" },
];

import { AllStatsType } from "./some_data/allStats";
import { AllTypesType } from "./some_data/allTypes";

export const findColor = (
  arr: any,
  typeName: string,
  property: any
) => {
  const result =  arr.find((item: AllTypesType | AllStatsType) => typeName === item.name);
  // @ts-ignore
  return result[property]
};

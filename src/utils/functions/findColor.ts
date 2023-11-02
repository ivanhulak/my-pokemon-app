import { AllStatsType } from "../allStats";
import { AllTypesType } from "../allTypes";

export const findColor = (
  arr: any,
  typeName: string,
  property: any
) => {
  const result =  arr.find((item: AllTypesType | AllStatsType) => typeName === item.name);
  // @ts-ignore
  return result[property]
};

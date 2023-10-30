export type RecountAllResultType = {
   portionsCount: number;
   allPages: number[];
 }
 export const recountAll = (totalCount: number, limit: number, portionSize: number) => {
   const pagesCount = Math.ceil(totalCount / limit);
   const portionsCount = Math.ceil(pagesCount / portionSize);
   const allPages = [];
   for (let i = 1; i <= pagesCount; i++) {
     allPages.push(i);
   }
   const recountAllResultObj: RecountAllResultType = {
     portionsCount,
     allPages,
   }
   return recountAllResultObj
 }
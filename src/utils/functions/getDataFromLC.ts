export const getDataFromLC = () => {
   const data = localStorage.getItem('data')
   const objData = data ? JSON.parse(data) : null
   const limit = objData?.limit ? objData.limit : 10
   return { limit }
}
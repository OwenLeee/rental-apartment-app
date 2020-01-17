import { ReduxThunkDispatch, IRootState } from "../store";
import { getApartments } from "./actions"



export function listApartmentsThunk(keywords: string, propertyType: string, minPrice: number, maxPrice: number,
    bedrooms: string, bathrooms: string, isFurniture: boolean, isCarpark: boolean) {

    return async (dispatch: ReduxThunkDispatch, getState: () => IRootState) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/search`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getState().auth.isAuthenticated}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                keywords, propertyType, minPrice, maxPrice, bedrooms, bathrooms, isFurniture, isCarpark
            })
        });
        const result = await res.json();
        console.log(result.flatList);
        if (res.status !== 200) {
            dispatch(getApartments(result.result)); 
        } else {
            dispatch(getApartments(result.flatList)); 
        }
    }
}

// export function searchApartmentsThunk(searchConditions: object) {

//     return async (dispatch: ReduxThunkDispatch, getState: () => IRootState) => {
//         const res = await fetch(`${process.env.REACT_APP_API_SERVER}/search`, {
//             method: "POST",
//             headers: {
//                 'Authorization': `Bearer ${getState().auth.isAuthenticated}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                searchConditions
//             })
//         });
//         const result = await res.json();
//         console.log(result.flatList);
//         if (res.status !== 200) {
//             dispatch(getApartments(result.result)); 
//         } else {
//             dispatch(getApartments(result.flatList)); 
//         }
//     }
// }
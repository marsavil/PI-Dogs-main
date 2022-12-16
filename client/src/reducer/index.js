import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_BY_QUERY,
    GET_DOG_BY_ID,
    SORTED_BY_NAME,
    SORTED_BY_WEIGHT,
    FILTERED_BY_TEMPERAMENT
} from '../actions_type/index';
import {getTemperaments} from '../actions/index'

const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_DOG_BY_QUERY:
            return {
                ...state,
                dogs: action.payload 
            }
        case GET_DOG_BY_ID:
            return {
                ...state,
                details: action.payload
            }
        case SORTED_BY_NAME:
            const sortedNames =
                action.payload === "asc"
                ? state.allDogs.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                : state.allDogs.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedNames,
            }
        case SORTED_BY_WEIGHT:
            const sortedWeight =
                action.payload === "asc"
                ? state.allDogs.sort((a, b) => {
                    if (a.weight_min > b.weight_min) {
                        return 1;
                    }
                    if (b.weight_min > a.weight_min) {
                        return -1;
                    }
                    return 0;
                })
                : state.allDogs.sort((a, b) => {
                    if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                        return -1;
                    }
                    if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedWeight,
            }
        case FILTERED_BY_TEMPERAMENT:
            const dogs = state.allDogs;
            let filteredDogs = [];
            if(action.payload === 'All'){
                filteredDogs = dogs;
            }else{
                for (let i = 0; i < dogs.length; i++) {
                    let match = dogs[i].temperaments.find((t) => t === action.payload)
                    if(match){
                        filteredDogs.push(dogs[i])
                    }
                }
            }
            return {
                ...state,
                dogs: filteredDogs
            }

        default:
            return state
    }

}
export default rootReducer;
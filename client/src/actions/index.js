import axios from 'axios';
import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_BY_QUERY,
    GET_DOG_BY_ID,
    SORTED_BY_NAME,
    SORTED_BY_WEIGHT,
    FILTERED_BY_TEMPERAMENT
} from '../actions_type/index'

export function getDogs(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        });
    }
    
};
export function getTemperaments(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        });
    }
};
export function getDogById(idRaza){
    return async function (dispatch){
        let json = await axios.get(`http://localhost:3001/dogs/${idRaza}`);
        return dispatch({
            type: GET_DOG_BY_ID,
            payload: json.data
        });
    }
};
export function getDogByQuery(payload){
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${payload}`);
            return dispatch ({
                type: GET_DOG_BY_QUERY,
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }

    }
};
export function createDog(payload){
    return async function(){
        const userCreate = await axios.post('http://localhost:3001/dog', payload);
        return userCreate;
    }
}
export function sortedByWeight(payload){
    return {
        type: SORTED_BY_WEIGHT,
        payload
    }
};
export function sortedByName(payload){
    return {
        type: SORTED_BY_NAME,
        payload
    }
};
export function filteredByTemperament(payload){
    return {
        type: FILTERED_BY_TEMPERAMENT,
        payload
    }
};
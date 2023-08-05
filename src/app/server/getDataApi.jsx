import axios from "axios";
const hash = process.env.NEXT_PUBLIC_API_HASH;
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const api_url = process.env.NEXT_PUBLIC_API_URL;
const skipNb = 0;
const validType = ['characters', 'comics', 'events', 'series', 'stories'];


/**
 * 
 * @param {int} offset 
 * @param {string} type 
 * @default value offset : 0
 * @default value type : 'characters'
 * @returns List of characters. 
 */
export async function getDataByType(type, offset, sortType) {
    const skipNb = offset ? Math.abs(offset):0;
    type = type.toLowerCase();
    let sort = null;
    if(sortType){
        sort=sortType;
    }else if(type == "comics" || type == "series"){
        sort = "title";
    }else if(type == "characters"){
        sort = "name";
    }else{
        sort = "id";
    }

    if(validType.includes(type) == false){
        throw new Error("Bad value for param type.");
    }
        return await axios.get(`${api_url}${type}?orderBy=${sort}&limit=100&offset=${skipNb}&ts=1&apikey=${api_key}&hash=${hash}`).then((res) => {
            return res.data.data.results;
        }).catch(function (error){
            throw new Error("Failed fetching data.", error);
        }); 
    
}

/**
 * 
 * @param {string} name 
 * @returns List of characters matching with name. 
 */
export async function getByName(name, type, sortType){
    let searchName = null;
    let sort = sortType ? sortType:'name';

    if(validType.includes(type) == false){
        throw new Error("Bad value for param type.");
    }
    
        if(type == 'characters' || type == 'events'){
            searchName = "nameStartsWith";
        }else{
            searchName = "titleStartsWith";
        }
        
        return await axios.get(`${api_url}${type}?orderBy=${sort}&${searchName}=${name}&limit=100&offset=${skipNb}&ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
            return response.data.data.results;
        }).catch(function (error){
            console.error("Fetching data error...", error);
        })
}



/**
 * 
 * @param {int} id 
 * @returns Characters informations.
 */
export async function getInfoId(id, type){
    return await axios.get(`${api_url}${type}/${id}?ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
        return response.data.data.results;
    }).catch(function (error){
        console.error("Fetching data error...", error);
    })
}

/**
 * 
 * @param {int} id 
 * @param {string} type 
 * @returns List of characters presents in the type given.
 */
export async function getCharactersListFrom(id, type){
    type = type.toLowerCase();
    
    if(validType.includes(type) == false){
        throw new Error("Bad value for param type.");
    }
        return await axios.get(`${api_url}${type}/${id}/characters?ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
            return response.data.data.results;
        }).catch(function (error){
            console.error("Fetching data error...", error);
        }) 
}


export async function getTypeInfoStoriesId(id, type){
    return await axios.get(`${api_url}stories/${id}/${type}?ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
        return response.data.data.results;
    }).catch(function (error){
        console.error("Fetching data error...", error);
    })

}

/**
 * 
 * @param {int} idCreator 
 * @param {string} type 
 * @param {int} offset 
 * @param {int} limit 
 * @returns Realisations mades by the creator. 
 */
export async function getRealisationCreatorId(idCreator, type, offset, limit){
    const skipNb = offset ? offset:0;
    const limitNb = limit ? limit:100;
    return await axios.get(`${api_url}creators/${idCreator}/${type}?limit=${limitNb}&offset=${skipNb}&ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
        return response.data.data;
    }).catch(function (error){
        console.error("Fetching data error...", error);
    })
}
/**
 * @param {string} forType
 * @param {int} idC 
 * @param {string} type 
 * @param {int} offset 
 * @param {int} limit 
 * @returns Realisations mades by the creator. 
 */
export async function getByTypeInfoId(forType, id, type, offset, limit){
    const skipNb = offset ? offset:0;
    const limitNb = limit ? limit:100;
    return await axios.get(`${api_url}${forType}/${id}/${type}?limit=${limitNb}&offset=${skipNb}&ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
        return response.data.data;
    }).catch(function (error){
        console.error("Fetching data error...", error);
    })
}


/**
 * 
 * @param {string} name 
 * @param {int} id 
 * @param {string} type 
 * @param {string} typeSearch 
 * @returns Search a realisation by their name.
 */
export async function searchByName(name, id, type, typeSearch){
    let searchName = null;
    if(typeSearch == 'characters' || typeSearch == 'events'){
        searchName = "nameStartsWith";
    }else{
        searchName = "titleStartsWith";
    }

    if(validType.includes(typeSearch) == false){
        throw new Error("Bad value for param type.");
    }
        return await axios.get(`${api_url}/${type}/${id}/${typeSearch}?${searchName}=${name}&limit=100&offset=${skipNb}&ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
            return response.data.data.results;
        }).catch(function (error){
            console.error("Fetching data error...", error);
        })
}

/**
 * 
 * @param {string} name 
 * @param {int} id 
 * @param {string} type 
 * @returns Search a creation by their name.
 */
export async function getByNameCharacterType(name, characId, type){
    let searchName = null;
    if(type == 'characters' || type == 'events'){
        searchName = "nameStartsWith";
    }else{
        searchName = "titleStartsWith";
    }
    if(validType.includes(type) == false){
        throw new Error("Bad value for param type.");

    }
        return await axios.get(`${api_url}/characters/${characId}/${type}?${searchName}=${name}&limit=100&offset=${skipNb}&ts=1&apikey=${api_key}&hash=${hash}`).then((response) => {
            return response.data.data.results;
        }).catch(function (error){
            console.error("Fetching data error...", error);
        })
}
import moment from "moment";
import ReactHtmlParser from 'react-html-parser'; 

/**
 * 
 * @param {Date} date 
 * @returns return date with format (DD/MM/YYYY).
 */
export const parseDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format("DD/MM/YYYY");
}

/**
 * 
 * @param {string} url 
 * @param {string} type 
 * @returns Get the id from url.
 */
export const getFromUrl = (url, type) => {
    url = url.split('/');
    return `../${type}/${url[url.length-1]}`;

}

/**
 * 
 * @param {string} info 
 * @returns returns list of creators.
 */
export const getCreators = (info) => {
    let roles = {};
    let allCreators = "";
    info.creators.items.map((creator) => {
        if(roles[creator.role] && roles[creator.role].length <= 4){
           roles[creator.role].push(`<a href="${getFromUrl(creator.resourceURI, "creators")}">, ${creator.name}</a>`);
        }else if(!roles[creator.role]){
            roles[creator.role] = [`<a href="${getFromUrl(creator.resourceURI, "creators")}">${creator.name}</a>`];
        }
    })
    for(let role in roles) {
        allCreators += `<li class="role"><strong>${role}: </strong>${roles[role].join('')}</li>`;
    }
    
    return (ReactHtmlParser(allCreators));
}

/**
 * 
 * @param {string} info 
 * @returns Get image's url.
 */
export const getImg = (info) => {
    let urlImg = null;
    if(info.images && info.images[0]){
        urlImg = `${info.images[0].path}.${info.images[0].extension}`
    }else[
        urlImg = `${info.thumbnail.path}.${info.thumbnail.extension}`
    ]

    return urlImg;
}


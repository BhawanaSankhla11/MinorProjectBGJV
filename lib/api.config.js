import { Directus } from '@directus/sdk';
const url = 'https://api.mbm.ac.in';


export default function getDirectus(optionalHeaders=null){
    let retObj = {auth:{mode:'json',autoRefresh:false}};
    if(!!optionalHeaders){
        retObj['transport']={
            'params':optionalHeaders
        }
    }
    //console.log(retObj);
    return new Directus(url,retObj);
}

export function getAssetURL(assetId) {
    if (!assetId) return null;
    return `${url}/assets/${assetId}`;
}

export function getAuthURL() {
    return `${url}/auth/`;
}

export function getFilesURL(){
    return `${url}/files/`;
}

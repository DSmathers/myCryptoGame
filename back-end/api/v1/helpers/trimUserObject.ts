
// removes object id, user id, and version number from user object to use in response.
export function trimUserObject(key:string,value:any){
    if(key=='_id') return undefined;
    else if(key=='uid') return undefined;
    else if(key=='__v') return undefined;
    else return value;
};
export interface User{
    username:string; 
    password:string;
    //el "?" es para que el parametro sea opcional
    name?:string;
    token?:string;
    id?:string;
};

export interface loginAnswer{
    accessToken:string;
    refreshToken:string;
    response:string;
}
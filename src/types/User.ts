export interface User{
    id: number,
    username: string,
    name: string,
    email: string,
    phone: string,
    website : string,
    address : {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
    };
    company : string,
    isLiked: boolean

}
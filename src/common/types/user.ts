interface IUser{
    id?:number,
    nameUser:string,
    email:string,
    password:string,
    address?:string,
    phone?:number,
    cart:number[],
    role:number
}
export default IUser
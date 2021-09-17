import axios from "axios";
import { IToken } from "./types/IToken";

export class ApiService {

    token?: IToken = undefined;
    private static _instance: ApiService;

    constructor(){
        this.getToken().then(res => {
            this.token = res.data.data;
        })
    }
    static getInstance()
    {
        return this._instance || (this._instance = new this());
    }

    // TODO: mettre en place la vérication du token

    getToken = async () => {
        return await axios.get(`http://localhost:4000/login`);
    }
   

    getBookings = async () => {
    return await axios.get(`http://localhost:4000/bookings`,{headers: { Authorization: `Bearer ${this.token?.token}` }})
  };

    getRessource = async () => {
    return await axios.get(`http://localhost:4000/resource`,{headers: { Authorization: `Bearer ${this.token?.token}` }})
  };

}






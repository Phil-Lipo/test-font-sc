import axios from "axios";
import moment from "moment";
import { IBooking } from "./types/IBooking";
import { IToken } from "./types/IToken";

export class ApiService {

    token?: IToken = undefined;
    private static _instance: ApiService;

    static getInstance()
    {
        return this._instance || (this._instance = new this());
    }

    // TODO: mettre en place la vérication du token

    getToken = async () => {
        return await axios.get(`http://localhost:4000/login`);
    };
   
    checkToken = async () => {
        console.log("Verification Token");
        if(this.token === undefined || moment(this.token.expirationDate.toString()).isBefore(moment())){
            console.log("Token expired");
            await this.getToken().then(res => {
                this.token = res.data.data;
            })
        }
    };

    getBookings = async () => {
            await this.checkToken();
        return await axios.get(`http://localhost:4000/bookings`,{headers: { Authorization: `Bearer ${this.token?.token}` }})
  };

    getRessource = async () => {
       await this.checkToken();
    return await axios.get(`http://localhost:4000/resource`,{headers: { Authorization: `Bearer ${this.token?.token}` }})
  };

  postBooking = async (data: any) => {
      await this.checkToken();
      return await axios.post(`http://localhost:4000/bookings`, data, { headers: { 
    'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token?.token}` }});
  }

}






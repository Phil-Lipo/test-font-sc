import axios from 'axios';
import moment from 'moment';
import { INewBooking } from '../types/INewBooking';
import { IToken } from '../types/IToken';

class ApiService {
    token?: IToken = undefined;

    private static _instance: ApiService;

    static getInstance() {
      if (this._instance === undefined) {
        this._instance = new this();
      }
      return this._instance;
    }

    // TODO: mettre en place la vérication du token

    getToken = async () => {
      const res = await axios.get('http://localhost:4000/login');
      return res;
    }

    checkToken = async () => {
      if (this.token === undefined || moment(this.token.expirationDate.toString()).isBefore(moment())) {
        await this.getToken().then((res) => {
          this.token = res.data.data;
        });
      }
    };

    getBookings = async () => {
      await this.checkToken();
      const res = await axios.get('http://localhost:4000/bookings', { headers: { Authorization: `Bearer ${this.token?.token}` } });
      return res;
    };

    getRessource = async () => {
      await this.checkToken();
      const res = await axios.get('http://localhost:4000/resource', { headers: { Authorization: `Bearer ${this.token?.token}` } });
      return res;
    };

  postBooking = async (data: INewBooking) => {
    await this.checkToken();
    const res = await axios.post('http://localhost:4000/bookings', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token?.token}`,
      },
    });
    return res;
  }

    getUserById = async (idUser: String) => {
      await this.checkToken();
      const res = await axios.get(`http://localhost:4000/users/${idUser}`, { headers: { Authorization: `Bearer ${this.token?.token}` } });
      return res;
    }

    getUserMe = async () => {
      await this.checkToken();
      const res = await axios.get('http://localhost:4000/me', { headers: { Authorization: `Bearer ${this.token?.token}` } });
      return res;
    }

    deleteBooking = async (idBooking: String) => {
      await this.checkToken();
      const res = await axios.delete(`http://localhost:4000/bookings/${idBooking}`, { headers: { Authorization: `Bearer ${this.token?.token}` } });
      return res;
    }
}

export default ApiService;

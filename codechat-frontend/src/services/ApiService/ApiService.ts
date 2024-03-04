/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { storageService } from "../StorageService/StorageService";
import { baseApiService } from "./BaseApiService";
import toast from "react-hot-toast";

export class ApiService {

    private static instance: ApiService;

    static getInstance() {
        if (!this.instance) {
            return new ApiService()
        }
        return this.instance;
    }

    public async createUser(data: any): Promise<any> {
        return this.request('/api/auth/createuser', data);
    }

    public async loginUser(data: any): Promise<any> {
        return this.request('/api/auth/login', data);

    }
    public async getCurrentUser (data:string| null):Promise<any>{
        try{
            const reqUrl = import.meta.env.VITE_BASE_URL+'/api/auth/getuser';
            const options:AxiosRequestConfig = {
                method:'POST',
                url:reqUrl,
                headers:{  
                    "authToken":data,
                }
            }
            const response =   await axios.request(options);
    
            return response?.data?.user;
        }
      catch(error :any)
      {
    toast.error(error?.message )
      }
    }


    async request(url: string, data: any): Promise<any> {
        try{
            const response = await baseApiService.post(url, data);
            if (response) {
                storageService.setLocalStorgaevlaue('token', response?.token);
            }
            return response;
        }
        catch(error :any)
        {
            toast.error(error?.message)
        }
    }
}
export const apiService = ApiService.getInstance();

import axios, { AxiosRequestHeaders } from "axios";
import { toast } from "react-hot-toast";

export declare type QueryParams = {
  [key: string]: string | string[];
};

class BaseApiService {

  private  BASE_URL :string;
  static instance :BaseApiService;
 private constructor()
 {
    this.BASE_URL = import.meta.env.VITE_BASE_URL;
 }

 static getInstance():BaseApiService{
        if(!this.instance)
        {
            return new BaseApiService();
        }
        else{
            return this.instance
        }
   }
 public async post(url:string ,  data:any ):Promise<any>{
  const reqUrl = this.BASE_URL + url;
  try{
    const response  =  await axios.post(reqUrl,data);
  return response?.data;
   }
  catch(error:any)
  {
    toast.error(error?.response?.data?.Status)
    return undefined;
  }
    
}
}


export const baseApiService = BaseApiService.getInstance();
import { io } from "socket.io-client";


export class SocketService {

    private static instance: SocketService;

    static getInstance() {
        if (!this.instance) {
            return new SocketService()
        }
        return this.instance;
    }

    public async  initialiseSocket():Promise<any>{
        // const options ={
        //     'force new connection':true,
        //      reconnectonAttempt:'Infinity',
        //      timeout:10000,
        //      transports:['websocket'],
        // }
        return  io(import.meta.env.VITE_BASE_URL)
    }
   
}
export const socketService = SocketService.getInstance();

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createConnection } from "../store/actions/sockets.action";
import { SocketActionType } from "../store/actions/action.constants";
import { RootReducer } from "../store/reducer/root";
import { toast } from "react-hot-toast";
import { updateRoom } from "../store/actions/room.action";



export const useSocket = (roomCode: string | undefined) => {

  const socketConnection = useSelector((state: ReturnType<typeof RootReducer>) => state.socket.instance);
  const currentUser = useSelector((state: ReturnType<typeof RootReducer>) => state.user);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   if(socketConnection)
  //   {

  //     socket = socketConnection;
  //   }
  // },[socketConnection])
  useEffect(() => {
    dispatch(createConnection());
    console.log("EDITOR CONNECTION RUN ")
  }, []);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.on(SocketActionType.FAILED, (err) => { toast.error(err) })
      console.log('socket effect is running ');
      socketConnection.emit(SocketActionType.JOIN, { roomCode, user: { ...currentUser } })

      socketConnection.on(SocketActionType.SOMEONE_JOINED, (data) => {
        const { user } = data;
        if (user._id !== currentUser._id) {
          console.log(user)
          toast.success(`${user.username} has joined the Room`)
        }
        dispatch(updateRoom({ roomMembers: data?.clients, editorCode: data?.currentEditorCode, roomCode: data.roomCode }))
      })

      socketConnection.on(SocketActionType.DISCONNECTED, (data) => {
        const { clients, socket, user ,editorCode} = data;
        const updatedUserList = clients.filter((item: any) => item.socketid != socket);
        console.log(updatedUserList)
        toast.error(`${user.username} has left the room.`);

        dispatch(updateRoom({ editorCode, roomCode, roomMembers: updatedUserList }))
      })

    }
    return () => {
      socketConnection?.disconnect()
    }
  }, [socketConnection, currentUser, dispatch])


}
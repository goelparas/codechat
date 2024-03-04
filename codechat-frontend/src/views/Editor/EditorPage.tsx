import { useSelector } from "react-redux";
import { RootReducer } from "../../store/reducer/root";
import { Avatar } from "@mui/material";
import Editor from "../../components/Editor/Editor";
import { useSocket } from "../../hooks/useSocket";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../shared-resources/components/Button/Button";
import { useDispatch } from "react-redux";
import {  disconnectConnection } from "../../store/actions/sockets.action";


const EditorPage = () => {
  const roomMembers = useSelector((state: ReturnType<typeof RootReducer>) => state.room.roomMembers);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useSocket(id);

  const copyRoomId = () => {
    if (id)
      navigator.clipboard.writeText(id);
  }
  const leaveRoom = () => {
    dispatch(disconnectConnection());
    navigate('/');
  }


  return (
    <>
       <div className="m-4 flex gap-5 border min-h-[90vh] rounded-2xl shadow-xl overflow-hidden">
          <div className="min-w-[20%] max-w-[20%] flex flex-col gap-5 p-5 justify-between min-h-full">
            <div className="flex ">
              {
                roomMembers?.length ? roomMembers.map((user) => <span key={user._id} className="m-2"><Avatar children={user.username}/></span>) : <></>
              }
            </div>
            <div className="w-full ">
              <Button name="Copy Code " fontColor="text-white" background="bg-primaryBlack" click={copyRoomId} />
              <Button name="Leave " fontColor="text-white" background="bg-primaryBlack" click={leaveRoom} />
            </div>
          </div>
          <div className="border-l min-w-[80%]  max-w-[80%] overflow-hidden "><Editor /> </div>
        </div>
      
    </>

  )
}

export default EditorPage;

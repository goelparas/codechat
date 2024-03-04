/* eslint-disable @typescript-eslint/no-explicit-any */
//hooks
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//service
import { storageService } from "../../services/StorageService/StorageService"
import { v4 as uuid } from 'uuid';
//components
import Input from "../../shared-resources/components/Input/Input"
import Button from "../../shared-resources/components/Button/Button"
import { toast } from "react-hot-toast/headless";
import { useDispatch, useSelector } from "react-redux";
import { createRoomAction, joinExistingRoom } from "../../store/actions/room.action";
import { RootReducer } from "../../store/reducer/root";
import { getUserAction } from "../../store/actions/users.action";

const Home = () => {
  const [joinCode, setJoinCode] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: ReturnType<typeof RootReducer>) => state.user);


  const navigateToEditor = useCallback((id: string) => {
    navigate(`/editor/${id}`);
  }, [navigate]);

  const joinRoom = (event: any) => {
    event.preventDefault();
    if (!joinCode.trim().length) {
      toast.error('Room code can not be empty');
    }
    else {

      dispatch(joinExistingRoom({ roomCode: joinCode, roomMembers: [user] }));
      // do a check if the room still exist or not from the database   
      navigateToEditor(joinCode);
    }
  }
  const createRoom = useCallback((event: any) => {
    event.preventDefault();
    if (user) {
        const newroomCode = uuid();

      dispatch(createRoomAction({ roomCode: newroomCode, roomMembers: [user], editorCode: '' }))
      navigateToEditor(newroomCode);
    }


  }, [dispatch, navigateToEditor, user]);

  const handleChange = (setState: any) =>
    (event: any) => { setState(event.target?.value) };

  useEffect(() => {
    if (!storageService.getLocalStorageValue('token')) {
      navigate('/login')
    }
    else {
      dispatch(getUserAction())
    }
  }, [navigate, dispatch])

  return (
    <div className='w-[70%] min-h-[500px] shadow-2xl flex bg-slate-300 m-auto justify-around items-center gap-5 rounded-2xl'>
      <div className="">
        <form onSubmit={joinRoom} >
          <Input name="Join Room" handleChange={handleChange(setJoinCode)} value={joinCode} />
          <Button name="Join" background="bg-primaryBlack" fontColor="text-white" />
        </form>
      </div>

      <div className=""> <h1>Create new one</h1>
        <form onSubmit={createRoom}>

          <Button name="Create" background="bg-primaryBlack" fontColor="text-white" />
        </form>
      </div>
    </div>
  )

}

export default Home;







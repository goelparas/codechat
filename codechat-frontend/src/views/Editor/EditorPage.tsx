import { useSelector } from 'react-redux'
import { RootReducer } from '../../store/reducer/root'
import { Avatar } from '@mui/material'
import Editor from '../../components/Editor/Editor'
import { useSocket } from '../../hooks/useSocket'
import { useParams } from 'react-router-dom'
import Button from '../../shared-resources/components/Button/Button'
import { useDispatch } from 'react-redux'
import { disconnectConnection } from '../../store/actions/sockets.action'
import { toast, Toaster } from 'sonner'
 

const EditorPage = () => {
    const roomMembers = useSelector(
        (state: ReturnType<typeof RootReducer>) => state.room.roomMembers
    )
    const { id } = useParams()
    const dispatch = useDispatch()

    useSocket(id)

    const copyRoomId = () => {
        if (id) navigator.clipboard.writeText(id)
        toast.success('Room Id Copied')
    }
    const leaveRoom = () => {
        dispatch(disconnectConnection())
        window.location.href = 'http://localhost:3000/chats'
    }
    return (
        <>
            <Toaster />
            
            <div className="m-4 flex gap-5  h-[90vh] z-[9999999] border-2 rounded-2xl shadow-xl overflow-hidden bg-[#F8F3F2]">
                <div className="min-w-[20%] max-w-[20%] flex flex-col z-[9999] gap-5 p-5 justify-between min-h-full bg-[#F8F3F2]">
                    <div className="flex">
                        {roomMembers?.length ? (
                            roomMembers.map((user) => (
                                <span key={user._id} className="m-2">
                                    <Avatar
                                        children={'A'}
                                        src={`https://cataas.com/cat`}
                                    />
                                </span>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="w-full z-[9999]">
                        <Button
                            name="Copy Code "
                            fontColor="text-black"
                            background="bg-[#a5e166]"
                            click={copyRoomId}
                        />
                        <Button
                            name="Leave"
                            fontColor="text-black"
                            background="bg-[#E2E1F4]"
                            click={leaveRoom}
                        />
                    </div>
                </div>
                <div className="border-l min-w-[80%]  max-w-[80%] overflow-hidden ">
                    <Editor />{' '}
                </div>
            </div>
        </>
    )
}

export default EditorPage

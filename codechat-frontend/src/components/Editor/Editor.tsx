import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useState } from 'react';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../store/reducer/root';
import { SocketActionType } from '../../store/actions/action.constants';
const Editor = () => {
    const socketConnection = useSelector((state:ReturnType<typeof RootReducer>)=>state.socket.instance);
    const editorCode = useSelector((state:ReturnType<typeof RootReducer>)=>state.room.editorCode);
    const  roomCode = useSelector((state:ReturnType<typeof RootReducer>)=>state.room.roomCode);
    console.log(editorCode, '--- redux-state----');
    
    const [code, setCode] = useState(editorCode);

    const handleChanges = (inputCode:string)=>{
        socketConnection?.emit(SocketActionType.CODE_CHANGE,{
            code: inputCode,roomCode
        })
        setCode(inputCode);
    }   

    useEffect(() => {
         socketConnection?.on(SocketActionType.CODE_CHANGE, ({code}:{[key in string]:string})=>{
            console.log(code);
            setCode(code);
         })
         setCode(editorCode);
    }, [socketConnection,editorCode])
    
    return (
        <div className='overflow-hidden min-w-[100%] min-h-[100%] '>
            <CodeMirror
                className='text-black bg-primaryBlack min-h-full min-w-full'
                value={code}
                onChange={(code) => {
                   handleChanges(code);
                }}
                height='98vh'
                extensions={[javascript()]}
                theme={dracula}
            />
        </div>
    )
}

export default Editor
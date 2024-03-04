import { CircularProgress } from '@mui/material'


const CircleLoaderAnimation = () => {
    return (
        <div className='absolute top-[50%] left-[50%] right-[50%] bottom-[50%]'><CircularProgress color='secondary' size={12} /></div>
    )
}
export default CircleLoaderAnimation;

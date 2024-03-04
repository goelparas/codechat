import { ReactElement } from "react";

type Props = {
    name: string;
    logo?: ReactElement;
    background ?:string;
    fontColor?:string;
    isDisabled?:boolean;
    click?:()=>void
}

const Button = (props: Props) => {
    const { name, logo,background,fontColor,isDisabled ,click} = props;
    return (
        <div className= {` flex  rounded-xl border-2 w-full ${logo?'justify-evenly' :'justify-center'} items-center ${background} my-2 `} onClick={click}>
             {logo}
            <button type='submit' className={`p-2 ${fontColor}  h-full ${logo?'w-[80%]':'w-full'}`} disabled={isDisabled}>{name}</button>
        </div>
    )
}
export default Button;

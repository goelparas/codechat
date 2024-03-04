type Props = {
  value: string;
  name: string;
  handleChange: (event: any) => void;
  inputType?: string;
}
const Input = (props: Props) => {
  const { value, name, handleChange, inputType } = props;

  return (
    <div className='p-1 w-full flex flex-col gap-1'>
      <label >{name.toString().toUpperCase()}</label>
      <input value={value} name={name} onChange={handleChange} className="w-full border p-2 rounded-xl select-none" type={`${inputType === 'password' ? 'password' : 'text'}`} autoSave="off" autoComplete="off" />
    </div>
  )
}
export default Input;

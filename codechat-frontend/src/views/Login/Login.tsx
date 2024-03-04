import { useEffect, useState } from 'react'
import Input from '../../shared-resources/components/Input/Input';
import Button from '../../shared-resources/components/Button/Button';
// hooks 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// actions
import { authAction, loginAction } from '../../store/actions/users.action';
//type
import { SignUpType, ValidationType } from '../../store/actions/types';
import { RootReducer } from '../../store/reducer/root';
//services
import { storageService } from '../../services/StorageService/StorageService';
import toast from 'react-hot-toast';

type defaultValue = {
  Email: string;
  Password: string;
  Name: string;
  Username: string;
}
type defaultloginValue = {
  email: string;
  password: string;
}

const Login = () => {
  const user = useSelector((state: ReturnType<typeof RootReducer>) => state.user);
  console.log(user);
  const [signupValue, setSignUpValue] = useState<defaultValue>({ Email: '', Password: '', Name: '', Username: '' });
  const [loginValue, setLoginValue] = useState<defaultloginValue>({ email: '', password: '' });
  const { email, password } = loginValue;
  const { Email, Password, Name, Username } = signupValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignupValidation = (data: SignUpType): ValidationType => {
    const mailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!data.Name.match(nameRegex) || !data.Username.match(nameRegex)) {

      return {
        isValid: true,
        reason: 'Name and Username must contain only letters and is required field'
      }
    }
    if (!data.Email.match(mailRegex)) {
      return {
        isValid: false,
        reason: 'Email format is not correct or maybe Empty'
      };
    }

    // Name and Username validation (same logic)

    // Password validation (minimum 8 characters)
    if (data.Password.length < 8) {

      return {
        isValid: false,
        reason: 'Password must be at least 8 characters long.'
      }
    }
    return {
      isValid: true,
      reason: ''
    }
  }
  const handleSignUp = (event: any) => {
    event.preventDefault();
    const formData = handleSignupValidation({ Username, Name, Email, Password });

    if (formData.isValid) {

      dispatch(authAction({ Username, Email, Password, Name }));

    }
    else {
      toast.error(formData.reason);
    }
    // setSignUpValue({ Email: '', Password: '', Name: '', Username: '' });
  }
  const handleLogin = (event: any) => {
    event.preventDefault();
    if (email !== '' && password !== '') {
      dispatch(loginAction({ email, password }));

    }
    else {
      toast.error('Please fill the Email and Password');
    }
  }
  const handleChange = (setState: any, state: any) =>
    (event: any) => { setState({ ...state, [event.target?.name]: event.target?.value }) }

  useEffect(() => {
    if (storageService.getLocalStorageValue('token')) {
      navigate('/');
    }
  }, [navigate])

  useEffect(() => {
    if (user?._id) {
      navigate('/');
    }
  }, [navigate, user])

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 m-2 rounded-3xl border-2 p-6  place-content-center mx-5 shadow-2xl'>
      <div className='flex flex-col gap-3 '>
        <div className='flex flex-col gap-3'>
          <h1 className='sm:text-xl md:text-2xl lg:text-4xl font-bold'> Get Started Now </h1>
        </div>
        <form onSubmit={handleSignUp} className='sm:w-full md:w-[75%] flex flex-col  ' autoComplete='off'>
          <Input name='Name' value={Name} handleChange={handleChange(setSignUpValue, signupValue)} />
          <Input name='Email' value={Email} handleChange={handleChange(setSignUpValue, signupValue)} />
          <Input name='Username' value={Username} handleChange={handleChange(setSignUpValue, signupValue)} />
          <Input name='Password' value={Password} handleChange={handleChange(setSignUpValue, signupValue)} inputType='password' />
          <Button name='Signup' fontColor='text-white' background='bg-primaryBlack' />
        </form>
        <br></br>
        <hr className=' w-full md:w-[75%]' />
        <br></br>

        {/**LOGIN form */}

        <form onSubmit={handleLogin} className='sm:w-full md:w-[75%] flex flex-col gap-2 ' autoComplete='off'>
          <Input name='email' value={email} handleChange={handleChange(setLoginValue, loginValue)} />
          <Input name='password' value={password} handleChange={handleChange(setLoginValue, loginValue)} inputType='password' />
          <Button name='Login' fontColor='text-white' background='bg-primaryBlack' />
        </form>
      </div>
      <div className='bg-primaryBlack   min-w-[50%] rounded-2xl min-h-full shadow-xl' ></div>
    </div>

  )
}

export default Login;

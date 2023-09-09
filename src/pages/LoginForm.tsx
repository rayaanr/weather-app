import {useState} from "react";
import {credentials} from "../credentials.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LoginForm = ({handleLogin}) => {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (username === credentials.username && password === credentials.password) {
            handleLogin();
        } else {
            setError('Invalid username or password')
        }
    };

    return (
        <main className='text-center w-11/12 sm:w-2/5 backdrop-blur-md border-2 border-white rounded-xl p-10'>
            <section className="flex gap-3 w-full justify-center mb-14 items-center">
                <img src="logo.svg" alt="logo" className="w-10 h-auto"/>
                <h1 className="text-3xl font-quantify">Weather App</h1>
            </section>
            <form>
                <section className='text-left mb-5'>
                    <label htmlFor='username'>Username</label><br/>
                    <input
                        className='w-full h-10 rounded-l-full rounded-r-full pl-5 text-sm'
                        type='text'
                        id='username'
                        value={username}
                        placeholder='Enter your username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </section>
                <section className='text-left mb-5'>
                    <label htmlFor='password'>Password</label><br/>
                    <input
                        className='w-full h-10 rounded-l-full rounded-r-full pl-5 text-sm'
                        type='password'
                        id='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>
                <button
                    onClick={handleSubmit}
                    className='w-full mt-5 pt-2 pb-2 pl-5 pr-5 border-2 text-white border-blue-500 bg-blue-500 rounded-l-full rounded-r-full hover:text-blue-500 hover:bg-white hover:border-blue-500'
                    type='submit'
                >
                    Login
                </button>
                <p className={'flex justify-center text-red-500 p-2'}>{error}</p>
            </form>
        </main>
    );
}

export default LoginForm;

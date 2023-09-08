import {useState} from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
        <main className='text-center w-1/3 border border-amber-600 rounded p-10'>
            <h1 className='text-2xl mb-10'>Login</h1>
            <form>
                <section className='text-left mb-5'>
                    <label htmlFor='username'>Username</label><br/>
                    <input className='w-full h-10'
                        type='text' id='username' value={username}  placeholder='Enter your username'
                           onChange={(e) => setUsername(e.target.value)}/>
                </section>
                <section className='text-left mb-5'>
                    <label htmlFor='password'>Password</label><br/>
                    <input className='w-full h-10'
                        type='password' id='password' value={password}  placeholder='Enter your password'
                           onChange={(e) => setPassword(e.target.value)}/>
                </section>
                <button className='w-full text-white rounded-r-full rounded-l-full bg-blue-600 p-2' type='submit'>Login</button>
            </form>
        </main>
        </>
    )
}

export default LoginForm;

import './App.css'
// import LoginForm from "./pages/LoginForm.tsx";
import Home from "./pages/Home.tsx";

function App() {
  //const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
        <main className={'min-h-screen flex justify-center items-center'}>
            {/*<LoginForm />*/}
            <Home />
        </main>
    </>
  )
}

export default App

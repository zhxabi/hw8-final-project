import SignupPage from './components/signuppage';
import LoginPage from './components/loginpage';
import HomePage from './components/homepage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      // errorElement: <ErrorPage />,
    },
  ]);



  return (
    <div className="container py-4 mx-auto rows-3">
    <div className='max-w-md text-3xl font-bold'>
      Budget Tracker
    </div>
   
    <RouterProvider router={router} />
    </div>
  )
}

export default App

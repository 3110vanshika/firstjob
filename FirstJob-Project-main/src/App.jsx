
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage"
import { ThemeProvider } from "./components/theam-provider";

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import ResetPassword from './pages/ResetPassword';
import PostJob from './pages/PostJobs';
import SavedJobs from './pages/SavedJobs';
import PostJobs from './pages/PostJobs';
import PostJobPage from './pages/PostJobPage';
import JobPage from './pages/JobPage';
import Userprofile from './pages/Userprofile';





const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/SignIn',
        element: <SignIn />,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
      },
      {
        path: '/ResetPassword',
        element: <ResetPassword />,
      },
      {
        path: '/PostJob',
        element: <PostJob />,
      },
      {
        path: '/SavedJobs',
        element: <SavedJobs />,
      },
      {
        path: '/JobPage/:id',
        element: <JobPage />,
      },
      {
        path: '/postJobPage',
        element: <PostJobPage />,
      },
      {
        path: '/userProfile',
        element: <Userprofile />,
      }
    ],
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite=ui-theme">
      <RouterProvider router={router}/> 
    </ThemeProvider>
    
  );
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import InvalidLink from './InvalidLink';

function App() {
  return (
    <BrowserRouter>
     <Container className='mt-5'>
      <ToastContainer position='top-center' theme='colored' />
      <Routes>
       <Route path='/' element={<ForgotPasswordForm />} />
       <Route path='/reset-password/:userId/:resetPasswordToken' element={<ResetPasswordForm />} />
       <Route path='/invalid-link' element={<InvalidLink />} />
      </Routes>
     </Container>
    </BrowserRouter>
  );
}

export default App;

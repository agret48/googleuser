import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import power from '../src/images/power.svg';
import Image from 'react-bootstrap/Image';
import { RootState } from './store';
import RegisterFirstStep from './components/RegisterFirstStep';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const form = useSelector((state: RootState) => state.form);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/user" element={<Login />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/" element={
            <Container className="appContainer">
              {form.step === 'form' && <RegisterFirstStep />}
              {form.step === 'confirmation' && <Confirmation />}
              <Container className='fixed-bottom text-center textFooter mb-5'>
                Powered by <Image height="50" src={power} />
              </Container>
            </Container>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

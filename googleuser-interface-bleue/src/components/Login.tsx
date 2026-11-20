import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post<string>(
        'https://nodejs-express-sequelize-mysql-production-fead.up.railway.app/loginAuthentification',
        { username, password }
      );
      // Stocker le token JWT dans le stockage local
      localStorage.setItem('token', response.data);
      navigate('/profil');
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Identifiant ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <Form className="cardCustom" onSubmit={handleLogin}>
        <div className="cardIcon">🔒</div>
        <div className="cardTitle">Espace administrateur</div>
        <p className="cardSubtitle">Connectez-vous pour gérer les textes.</p>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="fieldLabel">Identifiant</Form.Label>
          <Form.Control
            className="input__custom"
            type="text"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label className="fieldLabel">Mot de passe</Form.Label>
          <Form.Control
            className="input__custom"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <div className="fieldError text-center mb-3">{error}</div>}

        <Button className="buttonCustom text-white" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Se connecter'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;

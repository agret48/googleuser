import { useState, FormEvent } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions/formAction';

const RegisterFirstStep = () => {
  const [surnom, setSurnom] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError('');

    const errors: { [key: string]: string } = {};
    const errorMessage = 'Ce champ est obligatoire';
    if (surnom.trim() === '') errors.surnom = errorMessage;
    if (reference.trim() === '') errors.reference = errorMessage;
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Le serveur attend encore lastName / firstName : on y envoie le surnom.
    const formData = { lastName: surnom.trim(), firstName: surnom.trim(), reference };
    setLoading(true);

    fetch('https://nodejs-express-sequelize-mysql-production-fead.up.railway.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(async response => {
        const responseData = await response.json();
        const reference = responseData.commenUser.reference;
        const comments = responseData.commenUser.comments;
        const link = responseData.commenUser.link;
        dispatch(actions.updateStep('confirmation'));
        dispatch(actions.updateReference(reference));
        dispatch(actions.updateComments(comments));
        dispatch(actions.updateLink(link));
      })
      .catch(error => {
        console.error('Erreur lors de la communication avec le serveur : ', error);
        setServerError('Impossible de retrouver vos informations. Vérifiez votre référence et réessayez.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form className="cardCustom" onSubmit={handleSubmit} noValidate>
      <div className="steps">
        <span className="active" />
        <span />
      </div>
      <div className="cardTitle">Bienvenue</div>
      <p className="cardSubtitle">
        Renseignez vos informations pour continuer.<br />
        Aucune des informations que vous nous confiez ne sera conservée ou partagée à des fins commerciales.
      </p>

      <Form.Group className="mb-3" controlId="surnom">
        <Form.Label className="fieldLabel">Surnom <span style={{ color: 'var(--danger)' }}>*</span></Form.Label>
        <Form.Control
          className="input__custom"
          placeholder="Votre surnom"
          type="text"
          required
          value={surnom}
          isInvalid={!!errors.surnom}
          onChange={(e) => setSurnom(e.target.value)}
        />
        {errors.surnom && <div className="fieldError">{errors.surnom}</div>}
      </Form.Group>

      <Form.Group className="mb-4" controlId="reference">
        <Form.Label className="fieldLabel">Référence</Form.Label>
        <Form.Control
          className="input__custom"
          placeholder="Votre référence"
          type="text"
          value={reference}
          isInvalid={!!errors.reference}
          onChange={(e) => setReference(e.target.value)}
        />
        {errors.reference && <div className="fieldError">{errors.reference}</div>}
      </Form.Group>

      {serverError && <div className="fieldError text-center mb-3">{serverError}</div>}

      <Button className="buttonCustom text-white" type="submit" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Suivant'}
      </Button>
    </Form>
  );
};

export default RegisterFirstStep;

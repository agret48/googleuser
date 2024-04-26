import { useState, FormEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions/formAction';

const RegisterFirstStep = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: { [key: string]: string } = {};
    let errorMessage = "*obligatoire"
    if (lastName.trim() === '') {
      errors.lastName = errorMessage
    }
    if (firstName.trim() === '') {
      errors.firstName = errorMessage
    }
    if (reference.trim() === '') {
      errors.reference = errorMessage
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        lastName: lastName,
        firstName: firstName,
        reference: reference
      };

      fetch('https://nodejs-express-sequelize-mysql-production-fead.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(async response => {
          const responseData = await response.json();
          const reference = responseData.commenUser.reference
          const comments = responseData.commenUser.comments
          dispatch(actions.updateStep('confirmation'));
          dispatch(actions.updateReference(reference))
          dispatch(actions.updateComments(comments))
          dispatch(actions.updateLink(link))
        })
        .catch(error => {
          console.error('Erreur lors de la communication avec le serveur : ', error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <Row className="justify-content-center align-items-center pt-5">
      <Col className='pt-5 p-5'>
        <Form className='p-5 cardCustom' onSubmit={handleSubmit}>
          <p className='text-white text-center pb-3' style={{ color: '#B6B6B6', fontSize: '12px' }}>
            Aucune des informations que vous nous confiez ne sera conservée ou partagée à des fins commerciales.
          </p>
          <>
            <Form.Group className='mb-3'>
              <Form.Control className='input__custom' placeholder='Nom (Pseudonyme)' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              {errors.lastName && <div style={{ color: 'white', fontSize: '10px', marginLeft: '20px' }}>{errors.lastName}</div>}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control className='input__custom ' placeholder='Prénom' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              {errors.firstName && <div style={{ color: 'white', fontSize: '10px', marginLeft: '20px' }}>{errors.firstName}</div>}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control className='input__custom' placeholder='Référence' type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
              {errors.reference && <div style={{ color: 'white', fontSize: '10px', marginLeft: '20px' }}>{errors.reference}</div>}
            </Form.Group>
            <div className="text-center pt-3">
              <Button className='buttonCustom text-white' type="submit">Suivant</Button>
            </div>
          </>

        </Form>
      </Col>
    </Row>

  );
};

export default RegisterFirstStep;

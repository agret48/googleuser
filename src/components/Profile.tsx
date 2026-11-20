import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Form, Button, Spinner } from 'react-bootstrap';

const Profile: React.FC = () => {
  const [comments, setComments] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const AddComments = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await axios.post<string>(
        'https://nodejs-express-sequelize-mysql-production-fead.up.railway.app/createComments',
        { comments, reference }
      );
      setStatus({ ok: true, msg: 'Texte enregistré.' });
      setComments('');
      setReference('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setStatus({ ok: false, msg: "Erreur lors de l'enregistrement." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <Form className="cardCustom" onSubmit={AddComments}>
        <div className="cardTitle">Ajouter un texte</div>
        <p className="cardSubtitle">Associez un texte à une référence.</p>

        <Form.Group className="mb-3" controlId="reference">
          <Form.Label className="fieldLabel">Référence</Form.Label>
          <Form.Control
            className="input__custom"
            type="text"
            value={reference}
            onChange={e => setReference(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="comments">
          <Form.Label className="fieldLabel">Texte</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="input__custom"
            style={{ height: 'auto', paddingTop: 12 }}
            value={comments}
            onChange={e => setComments(e.target.value)}
          />
        </Form.Group>

        {status && (
          <div
            className="text-center mb-3"
            style={{ fontSize: 13, color: status.ok ? '#16a34a' : 'var(--danger)' }}
          >
            {status.msg}
          </div>
        )}

        <Button
          className="buttonCustom text-white"
          type="submit"
          disabled={loading || !comments.trim() || !reference.trim()}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Enregistrer'}
        </Button>
      </Form>
    </div>
  );
};

export default Profile;

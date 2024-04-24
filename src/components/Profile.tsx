import React, { useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [comments, setComments] = useState<string>('');
  const [reference, setReference] = useState<string>('');

  const AddComments = async () => {
    try {
      const response = await axios.post<string>('https://nodejs-express-sequelize-mysql-production-fead.up.railway.app/createComments', { comments, reference });

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Commentaire"
        value={comments}
        onChange={e => setComments(e.target.value)}
      />
      <input
        type="password"
        placeholder="Reference"
        value={reference}
        onChange={e => setReference(e.target.value)}
      />
      <button onClick={AddComments}>Ajouter Commentaire</button>
    </div>
  );
};

export default Profile;

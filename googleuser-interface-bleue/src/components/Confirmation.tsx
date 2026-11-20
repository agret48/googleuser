import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'react-bootstrap/Image';
import copyIcon from '../images/copyIcon.svg';
import { useState } from 'react';

const Confirmation = () => {
  const form = useSelector((state: RootState) => state.form);
  const [textCopied, setTextCopied] = useState(false);

  const notify = () =>
    toast.success('Texte copié !', { autoClose: 2000, position: 'top-center' });

  const fallbackCopy = () => {
    const textToCopy = document.querySelector('.text-copy');
    if (!textToCopy) return false;
    const range = document.createRange();
    range.selectNode(textToCopy);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    const ok = document.execCommand('copy');
    window.getSelection()?.removeAllRanges();
    return ok;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(form.comments);
    } catch {
      if (!fallbackCopy()) {
        console.error('Copie impossible.');
        return;
      }
    }
    setTextCopied(true);
    notify();
  };

  const linkUrl = () => {
    window.location.replace(form.link);
    window.history.replaceState(null, '', window.location.href);
  };

  return (
    <div className="cardCustom text-center">
      <ToastContainer />
      <div className="steps">
        <span className="active" />
        <span className="active" />
      </div>
      <div className="cardTitle">Votre texte</div>
      <p className="cardSubtitle">Copiez le texte ci-dessous, puis cliquez sur « Suivant ».</p>

      <div className="copyText">
        <p className="text-copy">{form.comments}</p>
        <button
          type="button"
          className={`copyButton ${textCopied ? 'copied' : ''}`}
          onClick={handleCopyText}
        >
          {textCopied ? '✓ Copié' : 'Copier'}
          {!textCopied && <Image src={copyIcon} />}
        </button>
      </div>

      <div className="pt-4">
        <Button className="buttonCustom text-white" onClick={linkUrl} disabled={!textCopied}>
          Suivant
        </Button>
        {!textCopied && <div className="hint">Copiez d'abord le texte pour continuer.</div>}
      </div>
    </div>
  );
};

export default Confirmation;

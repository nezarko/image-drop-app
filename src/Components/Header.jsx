import React from 'react';
import '../assets/css/Header.css';

const url =
  'data:image/png;base64,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';

function Header() {
  const scrollToBottom = () => {
    // Scroll to the bottom of the page
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className='header'>
      <div className='flower-container'>
        Eves
        <span >C</span>
        <span>h</span>
        <span>i</span>
        <span
          style={{ cursor: 'pointer' }}
        >
          <img src={url} alt="flower" className="flower-image" />
        </span>
        <span>dren</span>
      </div>
      <div className='flower-scroll'  onClick={scrollToBottom}>
      scroll and
      <img src={url} alt="flower" className="flower-image2" />

      </div>
    
    </div>
  );
}

export default Header;

import React from 'react';
import './AnonymousTitle.css';

export default function AnonymousTitle() {
  const letters = 'ANONYMOUS'.split('');

  return (
    <div className="anonymous-wrapper">
      {letters.map((letter, index) => (
        <div key={index} className="letter-box">
          <span className="letter">{letter}</span>
          <div
            className="letter-curtain"
            style={{ animationDelay: `${index * 0.3}s` }}
          ></div>
        </div>
      ))}
    </div>
  );
}

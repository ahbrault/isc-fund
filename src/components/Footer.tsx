import React from 'react';

type FooterProps = {
  children?: React.ReactNode;
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div>
      <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} ISC Fund. All rights reserved
      </p>
    </div>
  );
};

export default Footer;

import React from 'react';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

const ProductSimple = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '48px' }}>
      <div
        style={{
          position: 'relative',
          maxWidth: '330px',
          width: '100%',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            marginTop: '-120px',
            height: '230px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              transition: 'all 0.3s ease',
              content: '""',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '5px',
              left: '0',
              backgroundImage: `url(${IMAGE})`,
              backgroundSize: 'cover',
              filter: 'blur(15px)',
              zIndex: '-1',
            }}
          />
          <img
            style={{
              borderRadius: '8px',
              height: '230px',
              width: '100%',
              objectFit: 'cover',
            }}
            src={IMAGE}
            alt=""
          />
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: '12px', textTransform: 'uppercase' }}>
            Brand
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: '500', margin: '8px 0' }}>
            Nice Chair, pink
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>$57</p>
            <p style={{ fontSize: '16px', color: '#718096', margin: '0 0 0 8px', textDecoration: 'line-through' }}>
              $199
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSimple;

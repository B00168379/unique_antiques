'use client';
import Link from 'next/link';

export default function Header() {

  return (
    <div style={{
      backgroundColor: '#333',
      padding: '10px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>

      {/* logo */}
      <div>
        <img 
          src="/logo.png" 
          alt="logo"
          style={{ height: '90px' }}
        />
      </div>

      {/* navigation */}
      <div>
        <Link href="/dashboard" style={{ color: 'white', marginRight: '10px' }}>
          Home
        </Link>

        <Link href="/cart" style={{ color: 'white', marginRight: '10px' }}>
          Cart
        </Link>

        <Link href="/login" style={{ color: 'white' }}>
          Logout
        </Link>
      </div>

    </div>
  );
}
import React, { useState } from 'react';
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/Firebase.config';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    await signOut();
  };

  const handleSearch = () => {
    search && navigate(`/products?title=${search}`);
  }

  return (
    <div>

    </div>
  );
};

export default Navbar;
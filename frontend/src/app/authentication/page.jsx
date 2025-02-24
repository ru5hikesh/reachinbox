// app/authentication/page.jsx
'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Register from '@/components/auth/Register';

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);
  return isLogin ? <LoginForm switchToRegister={() => setIsLogin(false)} /> : <Register switchToLogin={() => setIsLogin(true)} />;
}

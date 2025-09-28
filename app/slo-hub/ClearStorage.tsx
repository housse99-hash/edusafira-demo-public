'use client';
import { useEffect } from 'react';

export default function ClearStorage() {
  useEffect(() => {
    try { localStorage.clear(); sessionStorage.clear(); } catch {}
  }, []);
  return null;
}

'use client'

import { User } from '@/shared/models/User';
import { useState } from 'react'

interface UserProps {
  params: {
    id: number;
  }
}

async function getUser(id: number) {
  return await fetch(`/api/v1/users/${id}`).then(res => res.json())
}

export default function User({ params }: UserProps) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  if (!user) {
    getUser(params.id).then(data => {
      if (data.message) {
        setError(data.message);
      } else {
        setUser(data)
      }
    });
  }

  if (!user) {
    if (error) {
      return <div>{error}</div>;
    }
    return <div>Loading...</div>;
  }

  return <div>User {user.name}</div>;
}

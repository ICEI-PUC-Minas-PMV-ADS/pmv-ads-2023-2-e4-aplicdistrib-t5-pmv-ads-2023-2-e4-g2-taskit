'use client';

import React from 'react';

export function Private({children}: {children: React.ReactNode}) {
  return (
    <>
      <h1>Hello from Private</h1>
      {children}
    </>
  )
}

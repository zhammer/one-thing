import React from 'react';
import './Page.scss';

interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    return (
        <div className='page'>
            {children}
        </div>
    )
}

import React from 'react'

export const SignLayout = ({ children }: { children?: React.ReactNode }) => {
    return <div className="flex w-scren h-screen border items-center justify-center">{children}</div>
}

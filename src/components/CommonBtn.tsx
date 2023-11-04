import React from 'react'
import { PropsWithChildren } from 'react'

type CommonBtnProps = {
   onClick: () => void;
   className: string;
}

export const CommonBtn: React.FC<PropsWithChildren<CommonBtnProps>> = (
   {onClick, children, className}
) => {

  return (
   <button className={className} onClick={onClick}>{children}</button>
  )
}
import React from "react";
import cn from 'classnames';

const selectOptions: number[] = [10, 20, 50]

type SelectProps = {
   currentOption: number;
   onOptionChange: (option: number) => void;
}
export const Select: React.FC<SelectProps> = ({onOptionChange, currentOption}) => {
   const [isOpen, setIsOpen] = React.useState(false)

   return (
      <div 
         tabIndex={0} 
         className="select__container"
         onClick={() => setIsOpen(prev => !prev)}
         onBlur={() => setIsOpen(false)}
      >
         <span className="select__value">{currentOption}</span>
         <ul className={cn('select__options', { 'show': isOpen })}>
            {selectOptions.map((option: number) => (
               <li
                  key={option}
                  className={cn('select__option', { 'selected': currentOption === option })}
                  onClick={() => onOptionChange(option)}
               >
                  {option}
               </li>
            ))}
         </ul>
      </div>
   );
};

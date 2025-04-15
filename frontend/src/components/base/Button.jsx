import React from 'react';
import classNames from 'classnames';
import { useButtonContext } from '../../context/ButtonContext'; 

export const ButtonAppearance = {
  DEFAULT: 'DEFAULT',
  MENU_BAR: 'MENU_BAR',
  MENU_ITEM: 'MENU_ITEM',
  TOGGLE: 'TOGGLE',
  WINDOW_BAR: 'WINDOW_BAR',
  WINDOW_BAR_TOGGLE: 'WINDOW_BAR_TOGGLE',
};

const Button = ({
  appearance,
  children,
  ariaLabel,
  className,
  dataId,
  onClick,
}) => {
  // Using context for managing button states
  const { isToggled, toggleButton, isEnabled } = useButtonContext();
  
  // Default button classes
  let buttonClasses = {};
  
  // Check if button is enabled
  let handleClick = onClick;
  let disabled = !onClick || !isEnabled;

  // Switch logic to apply button styles based on appearance type
  switch (appearance) {
    case ButtonAppearance.MENU_BAR:
      buttonClasses = {
        'flex items-center rounded px-1.5 text-sm cursor-default': true,
        'active:bg-gray-900/10 dark:active:bg-gray-50/10': onClick,
        'bg-gray-900/10 dark:bg-gray-50/10': isToggled,
      };
      break;

    case ButtonAppearance.MENU_ITEM:
      buttonClasses = {
        'flex w-full rounded px-2.5 py-1.5 text-xs leading-none tracking-wide hover:bg-blue-500 hover:text-gray-50': true,
      };
      break;

    case ButtonAppearance.TOGGLE:
      buttonClasses = {
        'p-1 rounded-full': true,
        'bg-blue-500 text-gray-50': isToggled,
        'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-50': !isToggled,
      };
      break;

    case ButtonAppearance.WINDOW_BAR:
      buttonClasses = {
        'h-full flex justify-center items-center rounded p-1.5': true,
        'text-neutral-500 hover:bg-gray-900/10 dark:text-neutral-400 dark:hover:bg-gray-50/10': true,
      };
      disabled = undefined; // prevent drag and double-click on window bar
      handleClick = isEnabled ? onClick : undefined;
      break;

    case ButtonAppearance.WINDOW_BAR_TOGGLE:
      buttonClasses = {
        'h-full flex justify-center items-center rounded p-1.5': true,
        'text-neutral-500 dark:text-neutral-400': true,
        'bg-gray-900/10 dark:bg-gray-50/10': isToggled,
      };
      disabled = undefined; // prevent drag and double-click on window bar
      handleClick = isEnabled ? onClick : undefined;
      break;

    case ButtonAppearance.DEFAULT:
      break;
    default:
      break;
  }

  // Prevent mouse events from propagating in certain scenarios
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <button
      className={classNames(buttonClasses, className)}
      aria-label={ariaLabel}
      data-id={dataId}
      onMouseDown={stopPropagation}
      onDoubleClick={stopPropagation}
      onClick={(e) => {
        handleClick && handleClick(e);
        if (appearance === ButtonAppearance.TOGGLE) {
          toggleButton();
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

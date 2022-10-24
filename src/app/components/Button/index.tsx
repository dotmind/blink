import classNames from 'classnames';

import styles from '@/app/components/Button/styles.module.scss';

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WHITE = 'white',
  BLACK = 'black',
  NONE = 'none',
  GLASS = 'glass',
  GRADIENT = 'gradient',
}

interface IProps {
  callback: () => void;
  style: ButtonStyle;
  disabled?: boolean | undefined;
  name: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

function Button({ callback, children, style, disabled, name, type }: IProps): JSX.Element {
  const buttonStyle: string = classNames(styles.button, styles[style]);

  return (
    // eslint-disable-next-line react/button-has-type
    <button onClick={callback} className={buttonStyle} disabled={disabled} type={type || 'button'} name={name} aria-label={name}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  type: 'button',
};

export default Button;

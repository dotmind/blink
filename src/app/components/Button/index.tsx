import classNames from 'classnames';

import styles from '@/app/components/Button/styles.module.scss';

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WHITE = 'white',
  BLACK = 'black',
}

interface IProps {
  callback: () => void;
  style: ButtonStyle;
  disabled?: boolean | undefined;
  name: string;
  children: React.ReactNode;
}

function Button({ callback, children, style, disabled, name }: IProps) {
  const buttonStyle = classNames(styles.button, styles[style]);

  return (
    <button onClick={callback} className={buttonStyle} disabled={disabled} type={'button'} name={name}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;

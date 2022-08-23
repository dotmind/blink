import classNames from 'classnames';

import styles from '@/app/components/Button/styles.module.scss';

export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
}

interface IProps {
  callback: () => void;
  style: ButtonStyle;
  disabled?: boolean | undefined;
  children: React.ReactNode;
}

function Button({ callback, children, style, disabled }: IProps) {
  const buttonStyle = classNames(styles.button, styles[style]);

  return (
    <button onClick={callback} className={buttonStyle} disabled={disabled} type={'button'}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;

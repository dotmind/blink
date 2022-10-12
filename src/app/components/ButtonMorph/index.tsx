import classNames from 'classnames';

import { ButtonStyle } from '@/app/components/Button';

import styles from '@/app/components/ButtonMorph/styles.module.scss';

interface IProps {
  style: ButtonStyle;
  icon: string;
  text: string;
  callback: () => void;
  name: string;
  disabled?: boolean;
  additionalClass?: string;
}

function ButtonMorph({ style, icon, text, callback, name, disabled, additionalClass }: IProps): JSX.Element {
  const buttonStyle = classNames(styles.circle, styles[style]);

  return (
    <button className={`${buttonStyle} ${additionalClass}`} type={'submit'} name={name} onClick={callback} disabled={disabled}>
      <p className={styles.text}>{text}</p>
      <img className={styles.icon} src={icon} alt={'Morph button icon'} />
    </button>
  );
}

ButtonMorph.defaultProps = {
  disabled: false,
  additionalClass: '',
};

export default ButtonMorph;

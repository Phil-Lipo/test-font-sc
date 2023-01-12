import {
  ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactElement,
} from 'react';
import './ButtonDefault.scss';

interface ButtonDefaultProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    logo: ReactElement;
    label: string;
}

const ButtonDefault:FC<ButtonDefaultProps> = ({
  label, logo, ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <button type="button" className="btn-default" {...props}>
    {logo && logo}
    <span>{label}</span>
  </button>
);

export default ButtonDefault;

/* <i aria-hidden="true" className="fas fa-times-circle  icon-btn" /> */

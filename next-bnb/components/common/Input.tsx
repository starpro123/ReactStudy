import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  position: relative;
  margin-bottom: 16px;

  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }

  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        &:focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.dark_cyan};
        }
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  label?: string;
  validateMode?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Input: FC<IProps> = ({
  label,
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container iconExist={!!icon} isValid={isValid} useValidation={validateMode && useValidation}>
      {label && (
        <label>
          <span>{label}</span>
          <input {...props}></input>
        </label>
      )}
      {!label && <input {...props} />}
      <div className='input-icon-wrapper'>{icon}</div>
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className='input-error-message'>{errorMessage}</p>
      )}
    </Container>
  );
};

export default memo(Input);

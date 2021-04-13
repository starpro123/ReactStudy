import styled from 'styled-components';
import CloseXIcon from '../../public/statics/svg/auth/modal_close_x_icon.svg';
import MailIcon from '../../public/statics/svg/auth/mail.svg';
import PersonXIcon from '../../public/statics/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/statics/svg/auth/opend_eye.svg';
import CloseEyeIcon from '../../public/statics/svg/auth/closed_eye.svg';
import Input from '../common/Input';
import Button from '../common/Button';
import palette from '../../styles/palette';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { loginAPI } from '../../lib/api/auth';
import useValidateMode from '../../hooks/useValidateMode';
import { userActions } from '../../store/user';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}
const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode('signup'));
  };
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요');
    } else {
      const loginBody = { email, password };
      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className='modal-close-x-icon' onClick={closeModal} />
      <div className='login-input-wrapper'>
        <Input
          placeholder='이메일 주소'
          name='email'
          type='email'
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          isValid={email !== ''}
          errorMessage='이메일이 필요합니다.'
        />
      </div>
      <div className='login-input-wrapper login-password-input-wrapper'>
        <Input
          placeholder='비밀번호 설정하기'
          type={hidePassword ? 'password' : 'text'}
          value={password}
          onChange={onChangePassword}
          isValid={password !== ''}
          errorMessage='비밀번호를 입력하세요.'
          icon={
            hidePassword ? (
              <CloseEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
        />
      </div>
      <div className='login-modal-submit-button-wrapper'>
        <Button type='submit'>로그인</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span className='login-modal-set-signup' role='presentation' onClick={changeToSignUpModal}>
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;

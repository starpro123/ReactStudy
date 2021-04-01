import styled from 'styled-components';
import CloseXIcon from '../../public/statics/svg/auth/modal_close_x_icon.svg';
import MailIcon from '../../public/statics/svg/auth/mail.svg';
import PersonXIcon from '../../public/statics/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/statics/svg/auth/opend_eye.svg';
import CloseEyeIcon from '../../public/statics/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/input';
import React, { useState } from 'react';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';

const Container = styled.div`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .sign-up-birthdate-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.333333%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
`;

const SignUpModal = () => {
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <CloseXIcon className='modal-close-x-icon' />
      <Input placeholder='이메일 주소' type='email' name='email' icon={<MailIcon />} />
      <Input placeholder='성(예: 홍)' icon={<PersonXIcon />} />
      <Input placeholder='이름(예: 길동)' icon={<PersonXIcon />} />
      <div className='sign-up-password-input-wrapper'>
        <Input
          placeholder='비밀번호 설정하기'
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <CloseEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
        />
      </div>
      <p className='sign-up-birthdate-label'>생일</p>
      <p className='sign-up-modal-birthday-info'>
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비앤비 이용자에게 공개되지
        않습니다.
      </p>
      <div className='sign-up-modal-birthday-selectors'>
        <div className='sign-up-modal-birthday-month-selector'>
          <Selector
            onChange={onChangeBirthMonth}
            options={monthList}
            defaultValue='월'
            disabledOptions={['월']}
          />
        </div>
        <div className='sign-up-modal-birthday-day-selector'>
          <Selector
            onChange={onChangeBirthDay}
            options={dayList}
            defaultValue='일'
            disabledOptions={['일']}
          />
        </div>
        <div className='sign-up-modal-birthday-year-selector'>
          <Selector
            onChange={onChangeBirthYear}
            options={yearList}
            defaultValue='년'
            disabledOptions={['년']}
          />
        </div>
      </div>
      <div className='sign-up-modal-submit-button-wrapper'>
        <Button type='submit'>가입하기</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;

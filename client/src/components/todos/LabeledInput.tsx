import { ReactElement, useState, memo } from 'react';
import Text from '@components/Text';
import { PRIMARY_COLORS, TABLE_MODALS } from '@util/Constants';
import { getTodayDate, gethhmmFormat } from '@util/Common';

import styled from 'styled-components';
import Select from '@components/Select';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { modalTypeAtom } from '@util/GlobalState';

const { darkGray, lightGray } = PRIMARY_COLORS;

interface InputProps {
  label: string;
  maxLength: number | string;
  type: string;
  id: string;
}

const Wrapper = styled.div`
  width: 100%;

  & {
    width: 100%;
    gap: 5px;
  }
  > *:focus {
    outline: 1px solid ${darkGray};
  }
  > input,
  textarea,
  select {
    padding: 8px;
    border: 1px solid ${lightGray};
    border-radius: 5px;
    color: ${darkGray};
  }
  > input[type='text'],
  textarea {
    &:last-child {
      width: 100%;
    }
  }
  > input[type='datetime-local'] {
    &:last-child {
      width: 30%;
    }
  }
`;

const LabeledInput = ({ label, maxLength, type, id }: InputProps): ReactElement => {
  const [input, setInput] = useState('');
  const [dateInput, setDateInput] = useState(getTodayDate());
  const [modalType] = useAtom(modalTypeAtom);

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    if (maxLength === Number.MAX_VALUE || maxLength < 0) {
      return setInput(value);
    }
    if (maxLength > value.length) {
      return setInput(value);
    }
    toast.error('제목은 50자 이상 입력 불가능합니다.');
  };

  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (modalType === TABLE_MODALS.create && getTodayDate() > value) {
      toast.error('새로 생성하는 Todo는 과거로 설정 불가능합니다.');
    }
    return setDateInput(value);
  };

  const blockUntilDateAtCreateMode = (): string => {
    const todayDate = getTodayDate();
    const nowTime = gethhmmFormat(new Date());
    if (modalType === TABLE_MODALS.create) {
      return todayDate + 'T' + nowTime;
    } else return '';
  };

  return (
    <Wrapper>
      <Text text={label} fontFamily={'SanSerif'} fontSize={'18px'} color={darkGray} fontWeight={'500'} />
      {type === 'text' && <input value={input} onChange={handleOnChangeText} type={type} id={id} />}
      {type === 'textarea' && <textarea id={id} />}
      {type === 'select' && <Select options={['A', 'B', 'C']} id={id} />}
      {type === 'datetime-local' && (
        <input
          type="datetime-local"
          value={dateInput}
          id={id}
          onChange={handleOnChangeDate}
          min={blockUntilDateAtCreateMode()}
        />
      )}
    </Wrapper>
  );
};

export default memo(LabeledInput);

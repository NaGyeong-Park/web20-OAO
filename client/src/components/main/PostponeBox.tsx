import { useAtom } from 'jotai';
import { memo, ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import Text from '@components/Text.js';
import Button from '@components/Button.js';

import { PRIMARY_COLORS } from '@util/Constants';
import { postponeOptionsAtom, asyncActiveTodo } from '@util/GlobalState';

import usePostpone from '@hooks/usePostpone.js';

const { red, white } = PRIMARY_COLORS;

const StyledPostponeBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${red};
  line-height: 25px;
  letter-spacing: 0em;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 161px;
  padding: 20px;
  gap: 20px;
  position: absolute;
  left: 40px;
  top: 60px;
`;

const PostponeBox = (): ReactElement => {
  const [postponeOptions, setPostponeOptions] = useAtom(postponeOptionsAtom);
  const [activeTodo] = useAtom(asyncActiveTodo);
  const [setPostpone] = usePostpone();

  useEffect(() => {
    setPostponeOptions();
  }, [activeTodo]);

  const handlePosponeClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setPostpone((e.target as Element).innerHTML);
  };

  return (
    <StyledPostponeBox>
      {postponeOptions.map((text: string): ReactElement => {
        return (
          <Button
            key={text}
            context={
              <Text
                text={text}
                color={white}
                fontFamily={'Noto Sans'}
                fontSize={'18px'}
                fontWeight={'700'}
                textAlign={'left'}
              />
            }
            onClick={handlePosponeClicked}
          />
        );
      })}
    </StyledPostponeBox>
  );
};
export default memo(PostponeBox);

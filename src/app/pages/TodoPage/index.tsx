/**
 *
 * TodoPage
 *
 */
import React, { memo, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useTodoSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodo } from './slice/selectors';

interface Props {}

export const TodoPage = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { actions } = useTodoSlice();
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector(selectTodo);

  useEffect(() => {
    dispatch(actions.getTodo());
  }, []);

  return (
    <Div>
      <p>Todo</p>
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        todos &&
        todos.map(item => {
          return <p>{item.title} </p>;
        })}
      {/*  {t(...messages.someThing())}  */}
    </Div>
  );
});

const Div = styled.div``;

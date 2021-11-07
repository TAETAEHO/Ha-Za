import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemContainer from '../components/maincomponents/ItemContainer';
import dummyTodo from '../dummydata';

export const MainpageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 137px);
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const MainContainer = styled.div`
  display: flex;
  /* width: 90rem; */
  justify-content: space-between;
  // border: 1px solid black;
  position: sticky;
  /* modified values */
  width: 100vw;
  padding: 1rem;
  padding-top: 0;
`;

const MakeContainer = styled.div`
  // border: 1px solid black;
  /* width: 75.1%; */
  margin-bottom: 10px;
  /* modified values */
  width: 100vw;
  margin-left: 4rem;
`;

const Mainpage = (): JSX.Element => {
  const level = ['ToDo', 'Doing', 'Done'];
  const [content, setContent] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const [list, setList] = useState([...dummyTodo]);
  // const [list, setList] = useState([]);
  const listNumber = list.length + 1;
  const addList = () => {
    const newTodo = {
      id: list.length === 0 ? 1 : list.length + 1,
      type: 'ToDo',
      content: content
    };
    if (content !== '') {
      setList([...list, newTodo]);
      setOpenInput(false);
      setContent('');
      sessionStorage.setItem(`${listNumber}`, JSON.stringify(newTodo));
    }
  };
  const ids = Object.keys(sessionStorage).sort();
  interface getItems {
    id: number;
    type: string;
    content: string;
  }
  let arr: { id: number; type: string; content: string }[] = [];
  // let objs: getItems = JSON.parse(sessionStorage.getItem('10'));
  // for (let i: number = 0; i < ids.length; i++) {
  //   arr.push(JSON.parse(sessionStorage.getItem(`${ids[i]}`)));
  // }
  useEffect(() => {
    console.log(Object.keys(sessionStorage).sort());
    console.log(list);
    console.log(typeof sessionStorage.getItem('10'));
    console.log(sessionStorage.getItem('10'));
    // console.log(window.sessionStorage);
  }, [list]);
  return (
    <MainpageWrapper>
      <div className="main">
        <MakeContainer>
          {openInput ? (
            <button
              onClick={() => {
                setOpenInput(false);
              }}>
              x
            </button>
          ) : (
            <button
              onClick={() => {
                setOpenInput(true);
              }}>
              +
            </button>
          )}
          {openInput ? (
            <>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setContent(e.target.value);
                }}></input>
              <button
                onClick={() => {
                  addList();
                }}>
                add
              </button>
            </>
          ) : null}
        </MakeContainer>
        <MainContainer>
          {level.map((el, key) => {
            return <ItemContainer key={key} level={el} list={list} />;
          })}
        </MainContainer>
      </div>
    </MainpageWrapper>
  );
};

export default Mainpage;

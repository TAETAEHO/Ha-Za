// import { useEffect } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/_var';

const Card = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10px;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  /* modified values */
  border: 1px solid ${Colors.mediumGray};
  color: ${Colors.mediumGray};
  :active {
    cursor: grabbing;
  }
`;

const Content = styled.div`
  // border: 1px solid black;
  text-align: center;
  width: 100%;
  position: sticky;
  // font-size: 20px;
`;

const ButtonContainer = styled.div`
  // border: 1px solid black;
  width: 100%;
  text-align: right;
`;

const Button = styled.button``;

const Space = styled.span`
  // border: 1px solid black;
  width: 100%;
  visibility: hidden;
`;

type ItemCardProps = {
  id: number;
  content: string;
  type: string;
  changeContent: (id: number, content: string) => void;
};

function ItemCard({ id, content, type, changeContent }: ItemCardProps) {
  const token = localStorage.getItem('accessToken');
  const deleteItem = () => {
    console.log(id);
    if (token) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/todo`, {
          headers: {
            authorization: `Bearer ${token}`
          },
          data: {
            id: id
          }
        })
        .then(() => {
          window.location.replace('/');
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      sessionStorage.removeItem(`${id}`);
    }
  };

  const [isEdit, setIsEdit] = useState(false);
  // const [text, setText] = useState(content);
  const [currentType, setCurrentType] = useState(type);
  // useEffect(() => {
  //   // console.log('text:', text);
  //   console.log('content:', content);
  // }, [content]);
  const changeType = () => {
    console.log(currentType);
  };
  console.log(currentType);
  return (
    <Card>
      <span>
        <Space>{id} </Space>
        <select
          onChange={(e) => {
            setCurrentType(e.target.value);
          }}
          value={currentType}>
          {/* <option value="" selected disabled hidden>
            {type}
          </option> */}
          <option onClick={changeType}>ToDo</option>
          <option onClick={changeType}>Doing</option>
          <option onClick={changeType}>Done</option>
        </select>
      </span>
      {isEdit ? (
        <input
          placeholder={content}
          onChange={(e) => {
            // setText(e.target.value);
            changeContent(id, e.target.value);
          }}
        />
      ) : (
        <Content>{content}</Content>
      )}
      {isEdit ? (
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsEdit(false);
            }}>
            ok
          </Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsEdit(true);
            }}>
            Edit
          </Button>
          <Button onClick={deleteItem}>Delete</Button>
        </ButtonContainer>
      )}
    </Card>
  );
}

export default ItemCard;

// import { useEffect } from 'react';
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
  // visibility: hidden;
`;

type ItemCardProps = {
  id: number;
  content: string;
  type: string;
  changeContent: (id: number, content: string) => void;
};

function ItemCard({ id, content, type, changeContent }: ItemCardProps) {
  const deleteItem = () => {
    console.log(id);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(content);
  const [changeType, setChangeType] = useState(type);
  useEffect(() => {
    console.log('text:', text);
    console.log('content:', content);
  }, [text]);

  return (
    <Card>
      <span>
        <Space>{id} </Space>
        <select
          onChange={(e) => {
            setChangeType(e.target.value);
          }}>
          <option value="" selected disabled hidden>
            {changeType}
          </option>
          <option>ToDo</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
      </span>
      {isEdit ? (
        <input
          placeholder={text}
          onChange={(e) => {
            setText(e.target.value);
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

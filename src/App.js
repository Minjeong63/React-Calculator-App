import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [buttonName, setButtonName] = useState('제출');

  const [updateId, setUpdateid] = useState(0);
  const [showMent, setShowMent] = useState(false);
  const [mentColor, setMentColor] = useState('');
  const [itemState, setItemState] = useState('');

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (showMent) {
      setTimeout(() => {
        setShowMent(false);
      }, 2000);
    }
  }, [showMent]);

  return (
    <div className="container">
      {showMent && (
        <div
          style={{
            width: '100%',
            margin: '20px 0px 0px 0px',
            backgroundColor: mentColor,
            padding: '12px 0px',
            display: 'flex',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          아이템이 {itemState}되었습니다.
        </div>
      )}
      <div>
        <h1>예산 계산기</h1>
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: '400px',
          padding: '20px',
        }}
      >
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
          }}
        >
          <div style={{ width: '100%' }}>
            <div style={{ padding: '5px', border: 0, color: '#4b89dc' }}>지출 항목</div>
            <div style={{ marginTop: '16px' }}>
              <input
                type="text"
                name="item"
                style={{
                  width: '80%',
                  padding: '5px',
                  border: 0,
                  borderBottom: '1px solid #d3d3d3',
                }}
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="예) 렌트비"
              />
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ padding: '5px', border: 0, color: '#4b89dc' }}>비용</div>
            <div style={{ marginTop: '16px' }}>
              <input
                type="number"
                name="price"
                style={{
                  width: '80%',
                  padding: '5px',
                  border: 0,
                  borderBottom: '1px solid #d3d3d3',
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div style={{ marginTop: '20px' }}>
          <input
            type="submit"
            value={buttonName}
            style={{
              backgroundColor: '#99ccff',
              color: 'white',
              border: 0,
              borderRadius: '4px',
              padding: '12px 24px',
            }}
            onClick={() => {
              if (buttonName == '수정') {
                const updateData = list.map((data2) => {
                  if (updateId == data2.id) {
                    setTotalPrice(Number(totalPrice) - Number(data2.price) + Number(price));
                    return { id: updateId, item, price };
                  }
                  return data2;
                });
                setList(updateData);
                setItemState('수정');
                setButtonName('제출');
              } else {
                setTotalPrice(Number(totalPrice) + Number(price));
                setList([...list, { id: list.length + 1, item, price }]);
                setItemState('생성');
              }
              setItem('');
              setPrice(0);
              setMentColor('green');
              setShowMent(true);
            }}
          />
        </div>
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', marginRight: '40px' }}>
            {list.map((data) => {
              return (
                <div
                  id={data.id}
                  style={{
                    width: '95%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '20px',
                    alignItems: 'space-between',
                    border: '1px solid #d3d3d3',
                    padding: '12px',
                  }}
                >
                  <div style={{ width: '100%' }}>{data.item}</div>
                  <div style={{ width: '100%' }}>{data.price}</div>
                  <div
                    style={{ width: '5%' }}
                    onClick={() => {
                      setItem(data.item);
                      setPrice(data.price);
                      setUpdateid(data.id);
                      setButtonName('수정');
                    }}
                  >
                    수정
                  </div>
                  <div
                    style={{ width: '5%' }}
                    onClick={() => {
                      const afterDeleteData = list.filter((data2) => data2.id !== data.id);
                      setList(afterDeleteData);
                      setTotalPrice(Number(totalPrice) - Number(data.price));
                      setItemState('삭제');
                      setMentColor('red');
                      setShowMent(true);
                    }}
                  >
                    삭제
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {list.length != 0 && (
          <div style={{ marginTop: '20px' }}>
            <input
              type="submit"
              value="목록 지우기"
              style={{
                backgroundColor: '#99ccff',
                color: 'white',
                border: 0,
                borderRadius: '4px',
                padding: '12px 24px',
              }}
              onClick={() => {
                setList([]);
                setItem('');
                setPrice(0);
                setTotalPrice(0);
                setItemState('모두 삭제');
                setMentColor('red');
                setShowMent(true);
              }}
            />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <h1>총지출:{totalPrice}원</h1>
      </div>
    </div>
  );
}

export default App;

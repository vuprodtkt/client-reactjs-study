import styled from 'styled-components';

const ButtonConfig = styled.button`
    background-color: ${p => p.isShowAnswer? (p.isClick ? (p.isAnswer ? "#7dd710":"#ff3030") : (p.isAnswer?"#7dd710":"white")) : "white"};
    height: 100px;
    width: 100%;
    box-shadow: 1px 1px 8px;
    padding: 30px;
    border-radius: 10px;

    pointer-events: ${p => p.isShowAnswer ? "none":"auto"};

    &:hover{
        background-color: #d6d6d6;
    }
`;

function Answer({index,answer,onClickAnswer,isShowAnswer,numClick,trueAnswer}) {
    return ( 
        <>
            <div className="col-md-6 px-5 py-3">
                <ButtonConfig
                    isShowAnswer = {isShowAnswer}
                    isClick = {numClick === index}
                    isAnswer = {trueAnswer === index}
                    onClick={() => onClickAnswer(index)}
                >
                    {answer}
                </ButtonConfig>
            </div>
        </>
    );
}

export default Answer;
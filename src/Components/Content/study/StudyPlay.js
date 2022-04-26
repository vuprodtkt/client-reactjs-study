
import { useEffect, useState } from 'react';
import Answer from './Answer';

function StudyPlay({numVocab,numGrammar,vocabularyList,grammarList}) {
    const [count,setCount] = useState(1);
    const [isShowAnswer,setIsShowAnswer] = useState(false);
    const [question,setQuestion] = useState([]);
    const [numClick,setNumClick] = useState(-1);
    // let question = []
    let total = numVocab + numGrammar;

    let verbTypeList = ["V-ing", "to + V1", "V1", "v3/ed","v2"];

    const formatType = (type) =>{
        if(type === "Danh từ"){
            return "(n)";
        }
        else if(type === "Động từ"){
            return "(v)";
        }
        else if(type === "Tính từ"){
            return "(adj)";
        }
        else if(type === "Trạng từ"){
            return "(adv)";
        }
    }

    const onClickAnswer = (index) => {
        setIsShowAnswer(true);
        setNumClick(index);
    }

    const onClickNext = () => {
        if(!isShowAnswer){
            alert("Làm ơn chọn đáp án!");
        }
        else{
            setCount(count + 1);
            setIsShowAnswer(false);
            setNumClick(-1);
        }
    }

    useEffect(() => {
        getVocabularyQuestion();
        getGrammarQuestion();
    },[])

    const getVocabularyQuestion = () => {
        for(let i = 0;i< numVocab;i++){
            let rand = Math.floor(Math.random() * vocabularyList.length);
    
            let numTrueAnswer = Math.floor(Math.random() * 4);
            let answerList = []
            for(let j = 0;j<4;j++){
                if (j === numTrueAnswer){
                    answerList[j] = vocabularyList[rand].means;
                }else{
                    let check = true;
                    while(check){
                        let rand1 = Math.floor(Math.random() * vocabularyList.length);
                        check = answerList.filter(answer => answer === vocabularyList[rand1].means).length === 0 && rand1 !== rand ? false:true;
    
                        if(!check){
                            answerList[j] = vocabularyList[rand1].means;
                        }
                    }
                }
            }
            let questionItem = {
                question: vocabularyList[rand].name + " " + formatType(vocabularyList[rand].type),
                answer: numTrueAnswer,
                answerList: answerList
            }
            setQuestion(prev => [...prev,questionItem]);
            // question.push(questionItem);
        }
    }
    const getGrammarQuestion = () => {
        for(let i = 0;i< numGrammar;i++){
            let rand = Math.floor(Math.random() * grammarList.length);
    
            let numTrueAnswer = Math.floor(Math.random() * 4);
            let answerList = []
            for(let j = 0;j<4;j++){
                if (j === numTrueAnswer){
                    answerList[j] = grammarList[rand].verbType;
                }else{
                    let check = true;
                    while(check){
                        let rand1 = Math.floor(Math.random() * verbTypeList.length);
                        check = answerList.filter(answer => answer.toLowerCase() === verbTypeList[rand1].toLowerCase()).length === 0 && rand1 !== rand ? false:true;
    
                        if(!check){
                            answerList[j] = verbTypeList[rand1].toLowerCase();
                        }
                    }
                }
            }
            let questionItem = {
                question: grammarList[rand].name,
                answer: numTrueAnswer,
                answerList: answerList
            }
            // question.push(questionItem);
            setQuestion(prev => [...prev,questionItem]);
        }
    }

    return ( 
        <>
        <div className="card">
            <div className="card-body p-0">
                <h5 className="card-title p-3 m-0 rounded-top bg-primary" style={{color:"#ffffff"}}>
                    <div className='row m-0'>
                        <p className="col-md-1 my-auto ">Câu hỏi:</p>
                        <div className="col-md-10 my-auto text-center ">
                            <p className="m-0">{count}/{total}</p>
                        </div>
                        <div className='col-md-1'>
                            {count < total ? <button className="btn btn-primary" onClick={onClickNext}><i className="bi bi-forward"> </i>Next</button> : ""}
                            
                        </div>
                    </div>
                    
                </h5>
                <div className="border-top-0 rounded-0 text-center" style={{minHeight: 80 + "px",padding: 20 + "px"}}>
                    <h3 className="m-0">{question.length !== 0?question[count-1].question:"empty"}</h3>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body p-3">
                <div className="row m-0">
                    {question.length !== 0? question[count - 1].answerList.map((answer,index) => <Answer key={index} index={index} answer = {answer} onClickAnswer = {onClickAnswer} isShowAnswer = {isShowAnswer} numClick={numClick} trueAnswer = {question[count - 1].answer}/>) : ""}
                </div>
            </div>
        </div>
        </>
     );
}

export default StudyPlay;
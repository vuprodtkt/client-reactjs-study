import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudyPlay from "./StudyPlay";
import axios from "axios";

function StudyPage() {
    const params = useParams();
    const [isPlay,setIsPlay] = useState(false);
    const [numVocab,setNumVocab] = useState(0);
    const [numGrammar,setNumGrammar] = useState(0);
    const [vocabularyList,setVocabularyList] = useState([]);
    const [grammarList,setGrammarList] = useState([]);

    useEffect(() => {
        axios.get('/' + params.lessonId + "/vocabulary/study")
            .then(res => {
                setVocabularyList(res.data);
            })
            .catch(err => console.log(err));
        
        axios.get('/' + params.lessonId + "/grammar/study")
            .then(res => {
                setGrammarList(res.data);
            })
            .catch(err => console.log(err));
    },[params.lessonId])


    const onClickPlay = () =>{
        if(numVocab < 0){
            alert("Số câu từ vựng không được nhỏ hơn 0!");
        }
        else if(numGrammar < 0){
            alert("Số câu ngữ pháp không được nhỏ hơn 0!");
        }
        else if(parseInt(numVocab) + parseInt(numGrammar) < 5){
            alert("Tổng số câu ít nhất là 5!");
        }
        else if(numVocab !== 0 && vocabularyList.length < 4){
            alert("Cần có ít nhất 4 từ vựng hiện có!");
        }
        else if(parseInt(numVocab) > vocabularyList.length){
            alert("Hiện tại chỉ có " + vocabularyList.length + " câu từ vựng!");
        }
        else if(parseInt(numGrammar) > grammarList.length){
            alert("Hiện tại chỉ có " + grammarList.length + " câu ngữ pháp!");
        }
        else{
            setIsPlay(!isPlay);
        }
    }

    const onChangeNumVocab = useCallback((e) =>{
        setNumVocab(e.target.value);
    },[])

    const onChangeNumGrammar = useCallback((e) =>{
        setNumGrammar(e.target.value);
    },[])

    const onDisabled = {
        pointerEvents: "none"
    }

    const onEnable = {
        pointerEvents: "auto"
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Study</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">{params.lessonId}</li>
                        <li className="breadcrumb-item active">Study</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <i className="bi bi-gear-fill"> </i>
                            Setting
                        </h5>
                        <div className="row">
                            <div className="col-md-5">
                                <label >Số câu từ vựng: </label>
                                <input className="m-1" type="number" min="0" max={vocabularyList.length} onChange={onChangeNumVocab} value={numVocab} style={isPlay ? onDisabled : onEnable}></input>
                            </div>
                            <div className="col-md-5">
                                <label >Số câu ngữ pháp: </label>
                                <input className="m-1" type="number" min="0" max={grammarList.length} onChange={onChangeNumGrammar} value={numGrammar} style={isPlay ? onDisabled : onEnable}></input>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" onClick={onClickPlay}>
                                    <i className={isPlay ? "bi bi-stop-circle" : "bi bi-play-circle"}> </i>
                                        {isPlay ? "Dừng học":"Bắt đầu"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isPlay ? <StudyPlay numVocab = {parseInt(numVocab)} numGrammar = {parseInt(numGrammar)} vocabularyList = {vocabularyList} grammarList = {grammarList} /> : <div></div>}
            </section>
        </>);
}

export default StudyPage;
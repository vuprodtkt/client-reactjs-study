import { useCallback, useEffect, useState } from "react";
import VocabularyItem from "./VocabularyItem";
import axios from "axios";
import { useParams } from "react-router-dom";

function VocabularyPage() {
    const [vocabulary,setVocabulary] = useState([]);
    const [inputName,setInputName] = useState("");
    const [inputMeans,setInputMeans] = useState("");
    const [type,setType] = useState("None");
    const params = useParams();

    let textInputSearch = "";

    useEffect( () => {
        axios.get('/' + params.lessonId + "/vocabulary")
            .then(res => {
                setVocabulary(res.data);
            })
            .catch(err => console.log(err));
    },[params.lessonId])

    const onTextInputNameChange = useCallback((e) => {
        setInputName(e.target.value)
    },[]);
    const onTextInputMeansChange = useCallback((e) => {
        setInputMeans(e.target.value)
    },[]);
    const onTypeChange = useCallback((e) => {
        setType(e.target.value)
    },[]);

    const addVocabulary = async(e) => {
        await axios.post('/' + params.lessonId + '/vocabulary/create',{
            vocabName: inputName,
            type: type,
            means: inputMeans
        })
        .then(res => {
            console.log("CREATE");
            console.log(res.data);
        })
        .catch(err => console.log(err));

        refreshVocabulary();
    };

    const removeVocabulary = async(id) => {
        await axios.get('/' + params.lessonId + '/vocabulary/destroy/' + id)
        .then(res => {
            console.log("Destroy");
            console.log(res.data);
        })
        .catch(err => console.log(err));

        refreshVocabulary();
    };

    const clickHiddenVocabulary = async(id,isHidden) => {
        await axios.post('/' + params.lessonId + '/vocabulary/hidden/' + id,{
            isHidden: isHidden
        })
        .then(res => {
            console.log("Hidden");
            console.log(res.data);
        })
        .catch(err => console.log(err));

        refreshVocabulary();
    };

    const refreshVocabulary = async() => {
        return await axios.get('/' + params.lessonId + "/vocabulary")
        .then(res => {
            setVocabulary(res.data);
        })
        .catch(err => console.log(err));
    };

    const searchVocabularyByName = (vocabName) =>{
        axios.post('/' + params.lessonId + '/vocabulary/searchbyname',{
            vocabName: vocabName
        })
        .then(res => {
            console.log("Search");
            console.log(res.data);
            setVocabulary(res.data)
        })
        .catch(err => console.log(err));
    }

    const onTextInputSearchChange = (e) => {
        textInputSearch = e.target.value;
        console.log(textInputSearch);
        if (textInputSearch !== ""){
            searchVocabularyByName(textInputSearch);
        }else{
            refreshVocabulary();
        }
    }

    return (  
        <>
            <div className="pagetitle">
                <h1>Vocabulary</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">{params.lessonId}</li>
                        <li className="breadcrumb-item active">Vocabulary</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" ><i className="bi bi-clipboard-plus"> </i>Thêm từ vựng</h5>
                        <div className="row pt-1">
                                <div className="col-md-4">
                                    <label htmlFor="inputName5" className="form-label" >Từ vựng</label>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputState" className="form-label">Loại từ</label>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputPassword5" className="form-label">Nghĩa của từ</label>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" className="form-control" onChange={onTextInputNameChange} value={inputName}/>
                            </div>
                            <div className="col-md-2">
                                <select id="inputState" className="form-select" onChange={onTypeChange} value={type}>
                                <option>None</option>
                                <option>Tính từ</option>
                                <option>Động từ</option>
                                <option>Danh từ</option>
                                <option>Trạng từ</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" onChange={onTextInputMeansChange} value={inputMeans}/>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" onClick={addVocabulary}>
                                    <i className="bi bi-plus-circle"> </i>
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <h5 className="card-title col-md-8 mb-0" >Danh sách Từ vựng</h5>
                            <div className="col-md-4">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Search" title="Enter search keyword" onChange={onTextInputSearchChange}/>
                                    <button type="button" className="btn btn-light"><i className="bi bi-search"></i></button>
                                </div>
                            </div>                
                        </div>
                        <table className="table datatable text-center">
                            <thead>
                                <tr>
                                    <th scope="col" style={{width: 5 + "%"}}>#</th>
                                    <th scope="col" style={{width: 40 + "%"}}>Từ Vựng</th>
                                    <th scope="col" style={{width: 8 + "%"}}>Loại từ</th>
                                    <th scope="col" style={{width: 40 + "%"}}>Nghĩa của từ</th>
                                    <th scope="col" style={{width: 7 + "%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {vocabulary.map((vocab,index) => <VocabularyItem key={vocab.id} index={index} vocabulary = {vocab} clickHiddenVocabulary = {clickHiddenVocabulary} removeVocabulary = {removeVocabulary} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
export default VocabularyPage;
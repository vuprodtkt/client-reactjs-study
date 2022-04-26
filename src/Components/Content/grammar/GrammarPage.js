import { useCallback, useEffect, useState } from "react";
import GrammarItem from "./GrammarItem";
import axios from "axios";
import { useParams } from "react-router-dom";

function GrammarPage() {
    const [grammar,setGrammar] = useState([]);
    const [inputName,setInputName] = useState("");
    const [inputVerbType,setInputVerbType] = useState("");
    const params = useParams();

    let textInputSearch = "";

    useEffect( () => {
        axios.get('/' + params.lessonId + "/grammar")
            .then(res => {
                setGrammar(res.data);
            })
            .catch(err => console.log(err));
    },[params.lessonId])

    const onTextInputNameChange = useCallback((e) => {
        setInputName(e.target.value)
    },[]);
    const onTextInputVerbTypeChange = useCallback((e) => {
        setInputVerbType(e.target.value)
    },[]);

    const addGrammar = async(e) => {
        await axios.post('/' + params.lessonId + '/grammar/create',{
            grammarName: inputName,
            verbType: inputVerbType,
            lessonId: params.lessonId
        })
        .then(res => {
            console.log("CREATE");
            console.log(res.data);
        })
        .catch(err => console.log(err));
        
        setInputName("");
        setInputVerbType("");
        refreshGrammar();
    };

    const removeGrammar = async(id) => {
        await axios.get('/' + params.lessonId + '/grammar/destroy/' + id)
        .then(res => {
            console.log("Destroy");
            console.log(res.data);
        })
        .catch(err => console.log(err));

        refreshGrammar();
    };

    const clickHiddenGrammar = async(id,isHidden) => {
        await axios.post('/' + params.lessonId + '/grammar/hidden/' + id,{
            isHidden: isHidden
        })
        .then(res => {
            console.log("Hidden");
            console.log(res.data);
        })
        .catch(err => console.log(err));

        refreshGrammar();
    };

    const refreshGrammar = async() => {
        return await axios.get('/' + params.lessonId + "/grammar")
        .then(res => {
            setGrammar(res.data);
        })
        .catch(err => console.log(err));
    };

    const searchGrammarByName = (grammarName) =>{
        axios.post('/' + params.lessonId + '/grammar/searchbyname',{
            grammarName: grammarName
        })
        .then(res => {
            console.log("Search");
            console.log(res.data);
            setGrammar(res.data)
        })
        .catch(err => console.log(err));
    }

    const onTextInputSearchChange = (e) => {
        textInputSearch = e.target.value;

        if (textInputSearch !== ""){
            searchGrammarByName(textInputSearch);
        }else{
            refreshGrammar();
        }
    }

    return (  
        <>
            <div className="pagetitle">
                <h1>Grammar</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">{params.lessonId}</li>
                        <li className="breadcrumb-item active">Grammar</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" ><i className="bi bi-clipboard-plus"></i> Thêm ngữ pháp</h5>
                        <div className="row pt-1">
                                <div className="col-md-5">
                                    <label htmlFor="inputName5" className="form-label" >Vế trái</label>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputPassword5" className="form-label">Vế phải</label>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <input type="text" className="form-control" onChange={onTextInputNameChange} value={inputName}/>
                            </div>
                            <div className="col-md-5">
                                <input type="text" className="form-control" onChange={onTextInputVerbTypeChange} value={inputVerbType}/>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" onClick={addGrammar}>
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
                            <h5 className="card-title col-md-8 mb-0" >Danh sách ngữ pháp</h5>
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
                                    <th scope="col" style={{width: 43 + "%"}}>Vế trái</th>
                                    <th scope="col" style={{width: 43 + "%"}}>Vế phải</th>
                                    <th scope="col" style={{width: 9 + "%"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grammar.map((gram,index) => <GrammarItem key={gram.id} index={index} grammar = {gram} clickHiddenGrammar = {clickHiddenGrammar} removeGrammar = {removeGrammar} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
export default GrammarPage;
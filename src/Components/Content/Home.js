import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import LessonItem from './LessonItem';
import { useCallback, useState } from 'react';

function Home({LessonList, removeLesson, addLesson,searchLesson,refreshLesson}) {
    const [textInput,setTextInput] = useState("")
    let textInputSearch = "";

    const onTextInputChange = useCallback((e) => {
        setTextInput(e.target.value)
    },[])

    const onTextInputSearchChange = (e) => {
        textInputSearch = e.target.value;
        if (textInputSearch != ""){
            searchLesson(textInputSearch);
        }else{
            refreshLesson();
        }
    }

    return (
        <>
            <div className="pagetitle">
                <h1>Home</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" >Tạo bài học mới</h5>
                        <Textfield
                            placeholder='Nhập tên khóa học vào đây'
                            elemAfterInput={
                                <Button 
                                isDisabled={!textInput} 
                                appearance="primary" 
                                onClick={() => addLesson(textInput,setTextInput)}
                                > 
                                  Thêm
                                </Button>
                            }
                            value={textInput}
                            onChange={onTextInputChange}
                        ></Textfield>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <h5 className="card-title col-md-8 mb-0" >Danh sách bài học</h5>
                            <div className="col-md-4">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Search" title="Nhập tên bài học" onChange={onTextInputSearchChange}/>
                                    <button type="button" className="btn btn-light"><i className="bi bi-search"></i></button>
                                </div>
                            </div>                
                        </div>
                        <table className="table datatable text-center">
                            <thead>
                                <tr>
                                    <th scope="col" style={{width: 10 + "%"}}>#</th>
                                    <th scope="col" style={{width: 80 + "%"}}>Tên bài học</th>
                                    <th scope="col" style={{width: 10 + "%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {LessonList.map((lesson,index) => <LessonItem key={lesson.lessonId} index={index}  lesson = {lesson} removeLesson = {removeLesson} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
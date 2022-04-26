import './App.css';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Content from '../Content/Content';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios';

function App() {
  //create state LessonList
  const [LessonList,setLessonList] = useState([])

  // get LessonList in api server
  useEffect(() => {
    axios.get('/lesson')
          .then(res => {
            setLessonList(res.data);
          })
          .catch(err => console.log(err));
  },[])

  const addLesson = async (textInput,setTextInput) => {
    await axios.post('/lesson/create',{
      lessonName: textInput
    })
    .then(res => {
      console.log("Create");
      console.log(res);
    })
    .catch(err => console.log(err));
    
    refreshLesson();
    setTextInput("");
  };

  const removeLesson = async(id) => {
    await axios.get('/lesson/destroy/' + id)
          .then(res => {
            console.log("Destroy");
            console.log(res);
          })
          .catch(err => console.log(err));
    
    refreshLesson();
  }

  const refreshLesson = async() =>{
    return await axios.get('/lesson')
          .then(res => {
            console.log("Get");
            console.log(res);
            setLessonList(res.data);
          })
          .catch(err => console.log(err));
  }

  const searchLesson = (lessonName) => {
    axios.post('/lesson/searchbyname',{
      lessonName: lessonName
    })
    .then(res => {
      console.log("Search");
      console.log(res.data);
      setLessonList(res.data);
    })
    .catch(err => console.log(err));
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar LessonList = {LessonList} />
        <Content LessonList = {LessonList} addLesson = {addLesson} removeLesson = {removeLesson} searchLesson = {searchLesson} refreshLesson = {refreshLesson}/>
        <a href="" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      </div>
    </Router>
  );
}

export default App;

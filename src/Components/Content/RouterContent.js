import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Home";
import VocabularyPage from "./vocabulary/VocabularyPage";
import {v4} from 'uuid' //get method v4 from uuid
import GrammarPage from "./grammar/GrammarPage";
import StudyPage from "./study/StudyPage";
import Page404 from "./404Page";

function RouterContent({LessonList , removeLesson , addLesson,searchLesson,refreshLesson }) {
    return ( 
        <Routes >
            <Route exact path="/home" element={<Home LessonList = {LessonList} removeLesson = {removeLesson} addLesson = {addLesson} searchLesson = {searchLesson} refreshLesson = {refreshLesson}/>} />
            <Route path="/home/:lessonId/vocabulary" element={<VocabularyPage key={v4()} />} />
            <Route path="/home/:lessonId/grammar" element={<GrammarPage key={v4()} />} />
            <Route path="/home/:lessonId/study" element={<StudyPage key={v4()} />} />
            <Route path="/*" element={<Page404 />} />
        </Routes>
    );
}

export default RouterContent;

// {CourseList.map(course => <Route key = {course.id} path={"/home/" + course.name + "/vocabulary"} element={<VocabularyPage key = {course.id} course = {course} addVocabulary = {addVocabulary} hiddenVocabulary = {hiddenVocabulary} removeVocabulary = {removeVocabulary} />}/> )}
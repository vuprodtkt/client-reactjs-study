import RouterContent from "./RouterContent";

function Content({LessonList, removeLesson, addLesson,searchLesson,refreshLesson}) {
    return (
        <main id="main" className="main">
            <RouterContent LessonList = {LessonList} removeLesson = {removeLesson} addLesson = {addLesson} searchLesson = {searchLesson} refreshLesson = {refreshLesson}/>
        </main>
    );
}

export default Content;
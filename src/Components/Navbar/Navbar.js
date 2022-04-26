import { Link } from "react-router-dom";
import LessonItem from './LessonItem';

function Navbar({LessonList}) {
    return ( 
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link " to="/home">
                        <i className="bi bi-grid" />
                        <span>Home</span>
                    </Link>
                </li>{/* End Home Nav */}
                {LessonList.map(lesson => <LessonItem key={lesson.lessonId} lesson = {lesson} />)}
            </ul>
        </aside>
    );
}

export default Navbar;
import {
    Link,
  } from "react-router-dom";
  
function LessonItem({lesson}) {
    const fixName = (lessonName) => {
        const result = lessonName.replace(/ /g, '');
        return result;
    };

    return ( 
        <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target={"#" + fixName(lesson.name) + "-nav"} data-bs-toggle="collapse" href="" aria-expanded="true">
                <i className="bi bi-briefcase-fill" /><span>{lesson.name}</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id={fixName(lesson.name) + "-nav"} className="nav-content collapse" data-bs-parent="#sidebar-nav" style={{}}>
                <li>
                    <Link to={"/home/" + lesson.lessonId + "/vocabulary"}>
                        <i className="bi bi-circle" /><span>Vocabulary</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/home/" + lesson.lessonId + "/grammar"}>
                        <i className="bi bi-circle" /><span>Grammar</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/home/" + lesson.lessonId + "/study"}>
                        <i className="bi bi-circle" /><span>Study</span>
                    </Link>
                </li>
            </ul>
        </li>
    );
}

export default LessonItem;
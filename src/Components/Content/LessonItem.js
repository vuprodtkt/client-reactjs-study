import styled, {css} from 'styled-components';
import TrashIcon from '@atlaskit/icon/glyph/trash'
import Button from '@atlaskit/button';


const ButtonConfig = styled(Button)`
    background-color: white !important;
    &:hover{
        background-color: #d6d6d6!important;
    }
`;

function LessonItem({index,lesson, removeLesson}) {
    return (
        <tr id={lesson.lessonId}>
            <th scope="row" className='align-middle'>{index + 1}</th>
            <td className='align-middle'>{lesson.name}</td>
            <td className='align-middle'>
                <div className="row">
                    <div className="RemoveIcon icon col-md-6 ">
                        <ButtonConfig 
                            iconAfter= { true && (
                                <span className='WatchIcon'>
                                    <TrashIcon />
                                </span>
                                )
                            }
                            onClick={() => removeLesson(lesson.lessonId)}
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default LessonItem;
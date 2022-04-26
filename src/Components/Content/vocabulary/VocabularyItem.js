import WatchFilledIcon from '@atlaskit/icon/glyph/watch-filled'
import WatchIcon from '@atlaskit/icon/glyph/watch'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import styled, {css} from 'styled-components';
import Button from '@atlaskit/button';

const ButtonConfig = styled(Button)`
    background-color: white!important;

    &{
        ${(p) => 
            p.isHidden && 
            css`
            background-color: #dfdfdf!important`
        }
    }
    
    
    &:hover{
        background-color: #d6d6d6!important;
    }
`;

function VocabularyItem({index,vocabulary,clickHiddenVocabulary,removeVocabulary}) {

    const styleHidden = {
        backgroundColor: "#dfdfdf"
    };

    const styleNotHidden = {
        backgroundColor: "white"
    }

    return ( 
        <tr id="row-1" style={vocabulary.isHidden ? styleHidden : styleNotHidden}>
            <th scope="row" className='align-middle'>{index+1}</th>
            <td className='align-middle'>{vocabulary.name}</td>
            <td className='align-middle'>{vocabulary.type}</td>
            <td className='align-middle'>{vocabulary.means}</td>
            <td className='align-middle'>
                <div className="row" >
                    <div className="icon col-md-6">
                        <ButtonConfig
                            isHidden={vocabulary.isHidden}
                            iconAfter= {(
                                <span className='WatchIcon'>
                                    {vocabulary.isHidden ? (<WatchFilledIcon />) : <WatchIcon />}
                                </span>
                                )
                            }
                            onClick={() => clickHiddenVocabulary(vocabulary.vocabId,!vocabulary.isHidden)}
                        >
                        </ButtonConfig>
                    </div>
                    <div className="RemoveIcon icon col-md-6 ">
                        <ButtonConfig 
                            isHidden={vocabulary.isHidden}
                            iconAfter= {(
                                <span className='WatchIcon'>
                                    <TrashIcon />
                                </span>
                                )
                            }
                        onClick={() => removeVocabulary(vocabulary.vocabId)}
                        > 
                        </ButtonConfig>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default VocabularyItem;
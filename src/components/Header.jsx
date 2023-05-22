import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faClipboardList} from '@fortawesome/free-solid-svg-icons'
function Header(){
    return(
        <div className="header">
            <FontAwesomeIcon icon={faClipboardList} />
            <span> Todo List</span>
            
        </div>
    )
}
export default Header;
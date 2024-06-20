
import {Link} from 'react-router-dom'

function Footer({footer_line, link_text, link_to}) {
  return (
    <div className='py-2 text-sm flex justify-center'>
        <div>
        {footer_line}
        </div>
            <Link className="pointer underline pl-1 cursor-pointer font-medium" to={link_to}>{link_text}</Link>
    </div>
  )
}

export default Footer

import './Footer.css'

function Footer(props) {
    const { paletteName, emoji } = props
    return (
        <div className='foot-cont'>
            <div className='foot-name'>
                <h5>
                    {paletteName} <span>{emoji}</span>
                </h5>

            </div>

        </div>


    );

}

export default Footer;
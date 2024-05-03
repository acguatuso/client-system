import { Link } from 'react-router-dom';
import './CursosMain.css';
import { FaArrowRight } from 'react-icons/fa';

interface CardProps {
    to: string;
    title: string;
    image: string;
    visible: number | undefined
}

function Card({ to, title, image, visible }: CardProps) {
    return (
        <div className={`card my-3 ${visible === 2 ? 'custom-card-proximamente' : 'custom-card'}`}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <img
                    src={image}
                    alt="Imagen"
                    className='card-img'
                />
            </div>
            {visible === 1 && (
                <div className="card-footer">
                    <Link to={to} className="read-more">Leer más <FaArrowRight /></Link>
                </div>
            )}
        </div>
    );
}


export default Card;

import { Link } from "react-router-dom";
import "./CursosMain.css";
import { FaArrowRight } from "react-icons/fa";
import { Curso } from "./curso.interface";

interface CardProps {
  to: string;
  curso: Curso;
}

function Card({ to, curso }: CardProps) {
  return (
    <div
      className={`card my-3 ${
        curso.visible === 2 ? "custom-card-proximamente" : "custom-card"
      }`}
    >
      <div className="card-body">
        <h5 className="card-title">{curso.nombre}</h5>
        <img src={curso.download_url} alt="Imagen" className="card-img" />
      </div>
      {curso.visible === 1 && (
        <div className="card-footer">
          <Link to={to} state={{ curso }} className="read-more">
            Leer más <FaArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Card;
import React from 'react';
import { FaBook, FaGraduationCap } from 'react-icons/fa';
import './HomteTables.css'

const HomeTables: React.FC<{ totalCursos: number; estudiantesCertificados: number }> = ({ totalCursos, estudiantesCertificados }) => {
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto"> {/* Centrar la columna */}
                    <div className="card custom-card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-12 text-center mb-3">
                                    <FaBook size={48} style={{ color: '#a8a2e3' }} />
                                </div>
                                <div className="col-12 text-center">
                                    <p style={{ fontWeight: 'bold' }}>{totalCursos}</p>
                                </div>
                                <div className="col-12 text-center">
                                    <p style={{ fontWeight: 'bold' }}>Cursos Ofrecidos</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-12 text-center mb-3">
                                    <FaGraduationCap size={48} style={{ color: '#a8a2e3' }} />
                                </div>
                                <div className="col-12 text-center">
                                    <p style={{ fontWeight: 'bold' }}>{estudiantesCertificados}</p>
                                </div>
                                <div className="col-12 text-center">
                                    <p style={{ fontWeight: 'bold' }}>Estudiantes Certificados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTables;

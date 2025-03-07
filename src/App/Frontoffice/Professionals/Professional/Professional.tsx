import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { professionalData } from '../Professionals';
import Fade from '../../../../utilities/minitiatures/Fade/Fade';

/**
 * Composant d'affichage détaillé d'un professionnel
 * Affiche toutes les informations d'un professionnel avec une mise en page structurée
 */
const Professional = React.memo(() => {
    // Récupération de l'ID du professionnel à partir de l'URL
    const { professionalId } = useParams<{ professionalId: string }>();
    
    // État local pour gérer les données et le chargement
    const [state, setState] = React.useState({
        professional: null as typeof professionalData[0] | null,
        isLoading: true,
        hasError: false
    });

    // Référence pour le scrolling automatique
    const professionalRef = React.useRef<HTMLDivElement>(null);

    // Effet pour charger les données du professionnel (simulation d'API)
    React.useEffect(() => {
        // Fonction pour simuler le chargement des données
        const loadProfessionalData = async () => {
            try {
                // Simulation d'un délai d'API
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Recherche du professionnel par ID
                const foundProfessional = professionalData.find(
                    p => p.id === Number(professionalId)
                );
                
                if (!foundProfessional) {
                    setState({
                        professional: null,
                        isLoading: false,
                        hasError: true
                    });
                    return;
                }
                
                setState({
                    professional: foundProfessional,
                    isLoading: false,
                    hasError: false
                });
            } catch (error) {
                console.error('Erreur lors du chargement du professionnel:', error);
                setState({
                    professional: null,
                    isLoading: false,
                    hasError: true
                });
            }
        };

        loadProfessionalData();
    }, [professionalId]);

    // Assurer que la page est scrollée tout en haut lors du chargement initial
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Faire défiler jusqu'au profil quand il est chargé
    React.useEffect(() => {
        if (!state.isLoading && state.professional) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [state.isLoading, state.professional]);

    // Si une erreur est survenue
    if (state.hasError) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    Le professionnel demandé n'a pas été trouvé ou une erreur est survenue.
                </div>
                <Link to="/professionals" className="btn btn-primary">
                    Retour à la liste des professionnels
                </Link>
            </div>
        );
    }

    return (
        <div className="professional-detail-container" ref={professionalRef}>
            <div className="container py-4 mt-5">
                {/* Affichage des détails du professionnel */}
                <Fade show={!state.isLoading && !!state.professional}>
                    {state.professional && (
                        <>
                            {/* En-tête avec informations principales */}
                            <div className="row mb-4 mt-5">
                                <div className="col-md-4">
                                    <img 
                                        src={state.professional.image} 
                                        alt={state.professional.name} 
                                        className="img-fluid rounded mb-3"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h1 className="mb-2">{state.professional.name}</h1>
                                    <h3 className="text-muted mb-3">{state.professional.title}</h3>
                                    
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rating me-2">
                                            <span className="text-warning">{'★'.repeat(Math.floor(state.professional.rating))}</span>
                                            <span className="text-muted">{'★'.repeat(5 - Math.floor(state.professional.rating))}</span>
                                        </div>
                                        <small className="text-muted">
                                            {state.professional.rating} ({state.professional.reviews} avis)
                                        </small>
                                    </div>
                                    
                                    <p>{state.professional.description}</p>
                                    
                                    <div className="professional-info">
                                        <p>
                                            <i className="fa fa-graduation-cap me-2"></i>
                                            <strong>Spécialisation:</strong> {state.professional.specialization}
                                        </p>
                                        <p>
                                            <i className="fa fa-clock-o me-2"></i>
                                            <strong>Expérience:</strong> {state.professional.experience}
                                        </p>
                                        <p>
                                            <i className="fa fa-map-marker me-2"></i>
                                            <strong>Adresse:</strong> {state.professional.address}
                                        </p>
                                        <p>
                                            <i className="fa fa-phone me-2"></i>
                                            <strong>Téléphone:</strong> {state.professional.phone}
                                        </p>
                                        <p>
                                            <i className="fa fa-envelope me-2"></i>
                                            <strong>Email:</strong> {state.professional.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Section d'éducation */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Formation</h4>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                {state.professional.education.map((edu, index) => (
                                                    <li key={index} className="list-group-item">
                                                        <h5>{edu.degree} ({edu.year})</h5>
                                                        <p className="mb-0">{edu.institution}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Section des services */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h4>Services</h4>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                {state.professional.services.map((service, index) => (
                                                    <li key={index} className="list-group-item">
                                                        <i className="fa fa-check-circle text-success me-2"></i>
                                                        {service}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Section de disponibilité */}
                                <div className="col-md-6">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h4>Disponibilité</h4>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Jour</th>
                                                        <th>Horaires</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.professional.availability.map((slot, index) => (
                                                        <tr key={index}>
                                                            <td>{slot.day}</td>
                                                            <td>{slot.hours}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bouton de retour */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <Link to="/professionals" className="btn btn-primary">
                                        <i className="fa fa-arrow-left me-2"></i>
                                        Retour à la liste des professionnels
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </Fade>
                
                {/* État de chargement */}
                <Fade show={state.isLoading}>
                    <div className="row placeholder-glow">
                        <div className="col-md-4">
                            <div className="placeholder w-100" style={{ height: '300px' }}></div>
                        </div>
                        <div className="col-md-8">
                            <h1 className="placeholder col-6 mb-3"></h1>
                            <h3 className="placeholder col-4 mb-3"></h3>
                            <p className="placeholder col-8 mb-2"></p>
                            <p className="placeholder col-10 mb-2"></p>
                            <p className="placeholder col-7 mb-3"></p>
                            <div className="professional-info">
                                <p className="placeholder col-5 mb-2"></p>
                                <p className="placeholder col-6 mb-2"></p>
                                <p className="placeholder col-8 mb-2"></p>
                                <p className="placeholder col-4 mb-2"></p>
                                <p className="placeholder col-7 mb-2"></p>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
});

export default Professional;

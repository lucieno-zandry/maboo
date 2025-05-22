import React from 'react';
import { Link } from 'react-router-dom';
import Fade from '../../../utilities/minitiatures/Fade/Fade';

// Données de test pour simuler l'API
export const professionalData = [
    {
        id: 1,
        name: "Dr. Emma Martin",
        title: "Cardiologue",
        specialization: "Cardiologie interventionnelle",
        experience: "15 ans",
        rating: 4.8,
        reviews: 124,
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/614007/img_placeholder_1034x432.png",
        address: "123 Rue de la Santé, Antananarivo",
        phone: "+261 34 12 34 567",
        email: "emma.martin@example.com",
        description: "Dr. Emma Martin est une cardiologue réputée spécialisée dans le traitement des maladies cardiovasculaires. Avec plus de 15 ans d'expérience, elle offre des soins de qualité exceptionnelle.",
        education: [
            { institution: "Université d'Antananarivo, Faculté de Médecine", degree: "Doctorat en Médecine", year: "2005" },
            { institution: "Hôpital Universitaire de Paris", degree: "Spécialisation en Cardiologie", year: "2010" }
        ],
        services: [
            "Consultation cardiologique",
            "Électrocardiogramme (ECG)",
            "Échocardiographie",
            "Test d'effort cardiaque",
            "Suivi des patients cardiaques"
        ],
        availability: [
            { day: "Lundi", hours: "8h00 - 16h00" },
            { day: "Mardi", hours: "8h00 - 16h00" },
            { day: "Mercredi", hours: "8h00 - 12h00" },
            { day: "Jeudi", hours: "8h00 - 16h00" },
            { day: "Vendredi", hours: "8h00 - 16h00" }
        ]
    },
    {
        id: 2,
        name: "Dr. Samuel Rakoto",
        title: "Pédiatre",
        specialization: "Pédiatrie générale",
        experience: "10 ans",
        rating: 4.9,
        reviews: 98,
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/614007/img_placeholder_1034x432.png",
        address: "45 Avenue des Enfants, Antananarivo",
        phone: "+261 33 45 67 890",
        email: "samuel.rakoto@example.com",
        description: "Dr. Samuel Rakoto est un pédiatre passionné par la santé et le bien-être des enfants. Il offre des soins complets pour les enfants de tous âges, de la naissance à l'adolescence.",
        education: [
            { institution: "Université d'Antananarivo, Faculté de Médecine", degree: "Doctorat en Médecine", year: "2010" },
            { institution: "Centre Hospitalier Universitaire d'Antananarivo", degree: "Spécialisation en Pédiatrie", year: "2015" }
        ],
        services: [
            "Consultations pédiatriques",
            "Suivi de croissance",
            "Vaccinations",
            "Soins préventifs",
            "Traitement des maladies infantiles"
        ],
        availability: [
            { day: "Lundi", hours: "9h00 - 17h00" },
            { day: "Mardi", hours: "9h00 - 17h00" },
            { day: "Mercredi", hours: "Fermé" },
            { day: "Jeudi", hours: "9h00 - 17h00" },
            { day: "Vendredi", hours: "9h00 - 15h00" },
            { day: "Samedi", hours: "9h00 - 12h00" }
        ]
    },
    {
        id: 3,
        name: "Dr. Marie Rasolofo",
        title: "Dermatologue",
        specialization: "Dermatologie clinique et esthétique",
        experience: "12 ans",
        rating: 4.7,
        reviews: 86,
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/614007/img_placeholder_1034x432.png",
        address: "78 Boulevard de la Peau, Antananarivo",
        phone: "+261 32 78 90 123",
        email: "marie.rasolofo@example.com",
        description: "Dr. Marie Rasolofo est une dermatologue expérimentée spécialisée dans le diagnostic et le traitement des affections cutanées. Elle offre également des services de dermatologie esthétique.",
        education: [
            { institution: "Université d'Antananarivo, Faculté de Médecine", degree: "Doctorat en Médecine", year: "2008" },
            { institution: "Institut de Dermatologie de Paris", degree: "Spécialisation en Dermatologie", year: "2013" }
        ],
        services: [
            "Consultation dermatologique",
            "Traitement de l'acné",
            "Dépistage du cancer de la peau",
            "Traitements anti-âge",
            "Soins des problèmes capillaires"
        ],
        availability: [
            { day: "Lundi", hours: "8h30 - 16h30" },
            { day: "Mardi", hours: "8h30 - 16h30" },
            { day: "Mercredi", hours: "8h30 - 16h30" },
            { day: "Jeudi", hours: "8h30 - 16h30" },
            { day: "Vendredi", hours: "8h30 - 15h00" }
        ]
    }
];

/**
 * Composant d'affichage d'une carte de professionnel dans la liste
 */
interface ProfessionalCardProps {
    id: number;
    name: string;
    title: string;
    specialization: string;
    experience: string;
    rating: number;
    reviews: number;
    image: string;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
    id, name, title, specialization, experience, rating, reviews, image
}) => {
    return (
        <div className="professional-card">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={image} className="img-fluid rounded-start" alt={name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
                            <p className="card-text">
                                <small>Spécialisation: {specialization}</small><br />
                                <small>Expérience: {experience}</small>
                            </p>
                            <div className="d-flex align-items-center mb-2">
                                <div className="rating me-2">
                                    <span className="text-warning">{'★'.repeat(Math.floor(rating))}</span>
                                    <span className="text-muted">{'★'.repeat(5 - Math.floor(rating))}</span>
                                </div>
                                <small className="text-muted">{rating} ({reviews} avis)</small>
                            </div>
                            <Link to={`/professionals/${id}`} className="btn btn-primary">
                                Voir le profil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Composant principal qui affiche la liste des professionnels
 */
const Professionals = React.memo(() => {
    // État pour gérer le chargement des données
    const [state, setState] = React.useState({
        professionals: [] as typeof professionalData,
        isLoading: true,
        hasError: false
    });

    // Effet pour charger les données des professionnels (simulation d'API)
    React.useEffect(() => {
        // Fonction pour simuler le chargement des données
        const loadProfessionals = async () => {
            try {
                // Simulation d'un délai d'API
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Utilisation des données de test
                setState({
                    professionals: professionalData,
                    isLoading: false,
                    hasError: false
                });
            } catch (error) {
                console.error('Erreur lors du chargement des professionnels:', error);
                setState({
                    professionals: [],
                    isLoading: false,
                    hasError: true
                });
            }
        };

        loadProfessionals();
    }, []);

    // Affichage d'un message d'erreur en cas de problème
    if (state.hasError) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    Une erreur est survenue lors du chargement des professionnels. Veuillez réessayer plus tard.
                </div>
            </div>
        );
    }

    return (
        <div className="professionals-container-main">
            <div className="professionals-container container">
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="display-5">Nos Professionnels</h1>
                        <p className="lead">
                            Découvrez nos professionnels de santé qualifiés et expérimentés, prêts à vous offrir les meilleurs soins.
                        </p>
                    </div>
                </div>

                {/* Affichage des professionnels */}
                <Fade show={!state.isLoading && state.professionals.length > 0} className="row">
                    {state.professionals.map((professional) => (
                        <div className="col-12 mb-4" key={professional.id}>
                            <ProfessionalCard 
                                id={professional.id}
                                name={professional.name}
                                title={professional.title}
                                specialization={professional.specialization}
                                experience={professional.experience}
                                rating={professional.rating}
                                reviews={professional.reviews}
                                image={professional.image}
                            />
                        </div>
                    ))}
                </Fade>

                {/* État de chargement */}
                <Fade show={state.isLoading} className="row">
                    {[...Array(3)].map((_, index) => (
                        <div className="col-12 mb-4" key={index}>
                            <div className="card mb-3 placeholder-glow">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <div className="placeholder w-100" style={{ height: '200px' }}></div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title placeholder col-6"></h5>
                                            <h6 className="card-subtitle mb-2 placeholder col-4"></h6>
                                            <p className="card-text">
                                                <span className="placeholder col-7"></span><br />
                                                <span className="placeholder col-5"></span>
                                            </p>
                                            <div className="placeholder col-4 mb-2"></div>
                                            <span className="placeholder col-3 btn btn-primary disabled"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fade>

                {/* Message si aucun professionnel */}
                <Fade show={!state.isLoading && state.professionals.length === 0 && !state.hasError}>
                    <div className="row">
                        <div className="col">
                            <div className="alert alert-info" role="alert">
                                Aucun professionnel n'est disponible actuellement. Veuillez revenir plus tard.
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
});

export default Professionals;

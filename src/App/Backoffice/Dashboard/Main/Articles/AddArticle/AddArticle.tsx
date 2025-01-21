import React from 'react';
import ArticleForm from '../../../../../../utilities/minitiatures/ArticleForm/ArticleForm';
import { Article } from '../../../../../../utilities/constants/types';
import Button from '../../../../../../utilities/minitiatures/Button/Button';
import { Modal } from 'react-bootstrap';

const AddArticle: React.FC = () => {
    const [state, setState] = React.useState({
        show: false,
        loading: false,
    });

    const setShow = React.useCallback((show: boolean) => setState(s => ({ ...s, show })), []);

    const handleArticleSubmit = (article: Article) => {
        console.log('Article submitted:', article);
        // Handle article submission (e.g., send to API)
    };

    return <div className='add-article-container'>
        <Button
            className="btn btn-secondary add-button"
            type="button"
            onClick={() => setShow(true)}>
            <i className="fa fa-plus"></i> Créer
        </Button>

        <Modal show={state.show} onHide={() => setShow(false)} size='xl' centered>
            <Modal.Header closeButton>
                <div>
                    <h3 className='mb-0'>Création d'un article</h3>
                    <small className='text-muted'>Remplir les données pour enregistrer un nouvel article</small>
                </div>
            </Modal.Header>
            <Modal.Body>
                <ArticleForm onSubmit={handleArticleSubmit} />;
            </Modal.Body>
        </Modal>
    </div>

};

export default AddArticle;

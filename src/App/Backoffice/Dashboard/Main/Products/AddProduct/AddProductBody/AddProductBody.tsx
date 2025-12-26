import React from "react";
import { Modal } from "react-bootstrap";
import Input from "../../../../../../../utilities/minitiatures/Input/Input";
import SelectedCategory from "../../../Categories/AddCategory/SelectedCategory/SelectedCategory";
import Button from "../../../../../../../utilities/minitiatures/Button/Button";
import useCategorySelect from "../../../../../../../utilities/minitiatures/CategorySelect/hooks/useCategorySelect";
import { Category } from "../../../../../../../utilities/constants/types";
import AddImages from "../../AddImages/AddImages";
import { Image as DDImage } from "../../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";
import NumberInput from "../../../../../../../utilities/minitiatures/NumberInput/NumberInput";
import truthyEntriesOnly from "../../../../../../../utilities/helpers/truthyEntriesOnly";

import useToasts from "../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import { createProduct, createProductVariant } from "../../../../../../../utilities/api/actions";
import { useProducts, useVariant } from "../../Products";
import { ProductVariantProvider } from "../../ProductVariant/ProductVariant";
import VariantsList from "../../ProductVariant/VariantsList/VariantsList";
import AddVariant from "../../ProductVariant/AddVariant/AddVariant";
import DeleteVariantsDialogue from "../../ProductVariant/DeleteVariantsDialogue/DeleteVariantsDialogue";
import VariantGenerator from "../../ProductVariant/AddVariant/VariantGenerator";
import {
    VariantGroupState,
    MatrixRowInput,
    buildMatrixRows,
    buildBaseSku,
    normalizeString
} from "../../ProductVariant/AddVariant/VariantGeneratorUtils";

type Props = {
    setShow: (show: boolean) => void
}

const MAXIMAGES = 4;
const DEFAULTINPUTVALUES = {
    title: '',
    description: '',
    images: [] as DDImage[],
    category: null as Category | null,
}

const DEFAULT_DD_IMAGE: DDImage = {
    imageData: null,
    imageUrl: '',
}

const Number = '' as number | '';

const AddProductBody = React.memo((props: Props) => {
    const toasts = useToasts();
    const categorySelect = useCategorySelect();
    const { reloadProducts } = useProducts();
    const variant = useVariant();

    const [state, setState] = React.useState({
        inputValues: DEFAULTINPUTVALUES,
        step: 'product' as 'product' | 'variants',
        variantFlow: 'default' as 'default' | 'variants',
        defaultVariant: {
            image: DEFAULT_DD_IMAGE,
            price: Number,
            special_price: Number,
            stock: Number,
        },
        groups: [] as VariantGroupState[],
        matrixRows: {} as Record<string, MatrixRowInput>,
        hideDisabled: true,
        loading: false,
        validationMessages: null as null | { [key: string]: any },
    });

    const HandleCategorySelectClose = React.useCallback((selected: Category | null) => {
        setState(s => ({ ...s, inputValues: { ...s.inputValues, category: selected } }))
    }, []);

    const handleOpenCategorySelect = React.useCallback(() => {
        categorySelect.open(HandleCategorySelectClose, state.inputValues.category?.id);
    }, [categorySelect.open, HandleCategorySelectClose, state.inputValues.category]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState(s => ({ ...s, inputValues: { ...s.inputValues, [name]: value } }));
    }, []);

    const handleFinish = React.useCallback(() => {
        props.setShow(false);
        setState(s => ({
            ...s,
            inputValues: DEFAULTINPUTVALUES,
            step: 'product',
            variantFlow: 'default',
            defaultVariant: {
                image: DEFAULT_DD_IMAGE,
                price: Number,
                special_price: Number,
                stock: Number,
            },
            groups: [],
            matrixRows: {},
            validationMessages: null,
            loading: false
        }));
        variant.setCurrent(null);
        reloadProducts();
    }, [props.setShow, reloadProducts, variant]);

    const setVariantFlow = React.useCallback((flow: 'default' | 'variants') => {
        setState(s => ({ ...s, variantFlow: flow }));
    }, []);

    const handleDefaultNumberChange = React.useCallback((value: number | '', e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setState(s => {
            switch (name) {
                case 'default_variant_price':
                    return { ...s, defaultVariant: { ...s.defaultVariant, price: value } };
                case 'default_variant_special_price':
                    return { ...s, defaultVariant: { ...s.defaultVariant, special_price: value } };
                case 'default_variant_stock':
                    return { ...s, defaultVariant: { ...s.defaultVariant, stock: value } };
                default:
                    return s;
            }
        });
    }, []);

    // Inputs for AddImages
    const addImage = React.useCallback((image: DDImage) => {
        if (state.inputValues.images.length >= MAXIMAGES) return;
        setState(s => ({ ...s, inputValues: { ...s.inputValues, images: [...s.inputValues.images, image] } }));
    }, [state.inputValues.images.length]);

    const removeImage = React.useCallback((index: number) => {
        setState(s => ({ ...s, inputValues: { ...s.inputValues, images: s.inputValues.images.filter((_, i) => i !== index) } }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        if (state.step !== 'product') return;

        // Validation
        if (!state.inputValues.title) {
            toasts.push({ title: "Erreur", content: "Le titre est obligatoire", type: "danger" });
            return;
        }
        if (!state.inputValues.category) {
            toasts.push({ title: "Erreur", content: "La catégorie est obligatoire", type: "danger" });
            return;
        }

        if (state.variantFlow === 'default') {
            const hasStock = state.defaultVariant.stock !== '';
            if (!hasStock) {
                toasts.push({
                    title: "Informations manquantes",
                    content: "Complète le stock du produit.",
                    type: "danger",
                });
                return;
            }
        } else {
            // Variant flow validation
            const matrixDescriptors = buildMatrixRows(state.groups);
            if (matrixDescriptors.length === 0) {
                toasts.push({ title: "Erreur", content: "Aucun variant configuré", type: "danger" });
                return;
            }
            
            // Check if at least one variant is enabled and valid
            let hasValid = false;
            const valid = matrixDescriptors.every(d => {
                const row = state.matrixRows[d.key];
                if (!row) return false;
                if (row.disabled) return true;
                if (row.stock === '') return false;
                hasValid = true;
                return true;
            });
            
            if (!valid || !hasValid) {
                 toasts.push({ title: "Erreur", content: "Veuillez vérifier les variants (stock requis)", type: "danger" });
                 return;
            }
        }

        setState(s => ({ ...s, loading: true }));

        const payload = truthyEntriesOnly({
            title: state.inputValues.title,
            category_id: state.inputValues.category?.id,
            description: state.inputValues.description,
        }) || {};

        if (state.inputValues.images.length > 0) {
            payload.images = state.inputValues.images.map(image => image.imageData!);
        }

        createProduct(payload)
            .then((response) => {
                const created = (response as any)?.data?.product || (response as any)?.data?.createdProduct || (response as any)?.data?.data?.product || null;
                const createdId = typeof created?.id === 'number' ? created.id : null;
                const createdSlug = typeof created?.slug === 'string' ? created.slug : undefined;

                if (!createdId) {
                    throw new Error("Produit créé mais ID manquant");
                }

                if (state.variantFlow === 'default') {
                    const title = normalizeString(state.inputValues.title);
                    const baseSku = buildBaseSku(title || createdSlug || String(createdId));
                    const image = state.inputValues.images.length > 0 ? state.inputValues.images[0].imageData! : null;

                    return createProductVariant({
                        image: image as any,
                        name: title || 'Default',
                        product_id: createdId,
                        price: state.defaultVariant.price === '' ? 0 : state.defaultVariant.price,
                        special_price: state.defaultVariant.special_price === '' ? undefined : state.defaultVariant.special_price,
                        inStock: state.defaultVariant.stock === '' ? 0 : state.defaultVariant.stock,
                        stock: state.defaultVariant.stock === '' ? 0 : state.defaultVariant.stock,
                        sku: baseSku,
                        attributes: {},
                    }).then(() => {
                         toasts.push({
                            title: "Produit finalisé",
                            content: "Le produit et son variant par défaut ont été créés",
                            type: "success",
                        });
                        handleFinish();
                    });
                } else {
                    // Variant flow
                    const matrixDescriptors = buildMatrixRows(state.groups);
                    const failures: string[] = [];
                    const createdVariants: any[] = [];

                    return matrixDescriptors.reduce((p, d) => {
                        return p.then(() => {
                            const row = state.matrixRows[d.key];
                            if (!row || row.disabled) return;

                            const payload = {
                                name: row.name,
                                price: row.price === '' ? 0 : row.price,
                                inStock: row.stock === '' ? 0 : row.stock,
                                stock: row.stock === '' ? 0 : row.stock,
                                image: row.image?.imageData || null,
                                product_id: createdId,
                                special_price: row.special_price === '' ? undefined : row.special_price,
                                sku: row.sku ? row.sku : undefined,
                                attributes: d.attributes,
                            };

                            return createProductVariant(payload)
                                .then(res => {
                                    if (res.data) createdVariants.push(res.data);
                                })
                                .catch(() => {
                                    failures.push(row.name);
                                });
                        });
                    }, Promise.resolve())
                    .then(() => {
                         if (failures.length === 0) {
                            toasts.push({
                                title: "Produit et variants créés",
                                content: `${createdVariants.length} variants ajoutés`,
                                type: "success",
                            });
                            handleFinish();
                         } else {
                            toasts.push({
                                title: "Création partielle",
                                content: `${createdVariants.length} créés, ${failures.length} échecs`,
                                type: "danger",
                            });
                            // Stay on modal or go to finish?
                            // Maybe go to variant management step to fix?
                            variant.setCurrent({ id: createdId, slug: createdSlug, title: state.inputValues.title, variants: [] });
                            setState(s => ({ ...s, step: 'variants', loading: false }));
                            reloadProducts();
                         }
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                toasts.push({
                    title: "Erreur",
                    content: "Une erreur est survenue lors de la création",
                    type: "danger",
                });
                setState(s => ({ ...s, loading: false }));
            });

    }, [state, toasts, props.setShow, reloadProducts, handleFinish, variant]);

    const baseSku = React.useMemo(() => {
        return buildBaseSku(state.inputValues.title);
    }, [state.inputValues.title]);

    return <>
        <Modal.Header closeButton>
            <Modal.Title>
                {state.step === 'product' ? 'Nouveau produit' : 'Gérer les variants'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {state.step === 'product' && <div className="row">
                <div className="col-7 my-3">
                    <h6>Informations principales</h6>
                    <Input
                        name="title"
                        placeholder="Titre du produit"
                        className="form-control mb-3"
                        value={state.inputValues.title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="form-control"
                        rows={4}
                        value={state.inputValues.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-5 my-3 d-flex justify-content-between">
                    <div>
                        <h6>Catégorie du produit *</h6>
                        <SelectedCategory category={state.inputValues.category} />
                    </div>
                    <Button
                        type="button"
                        className="btn btn-outline-dark btn-sm align-self-start"
                        onClick={handleOpenCategorySelect}>Ouvrir <i className="fa fa-external-link"></i></Button>
                </div>
                <div className="col-12 my-2">
                    <div className="d-flex gap-4 align-items-center">
                        <label className="d-flex gap-2 align-items-center m-0">
                            <input
                                type="radio"
                                name="product_variant_flow"
                                checked={state.variantFlow === 'default'}
                                onChange={() => setVariantFlow('default')}
                            />
                            <span>Produit sans variants (1 variant par défaut)</span>
                        </label>
                        <label className="d-flex gap-2 align-items-center m-0">
                            <input
                                type="radio"
                                name="product_variant_flow"
                                checked={state.variantFlow === 'variants'}
                                onChange={() => setVariantFlow('variants')}
                            />
                            <span>Produit avec variants</span>
                        </label>
                    </div>
                </div>
                <div className="col-8 my-3">
                    <h6>
                        Images du produit
                    </h6>
                    <AddImages
                        addImage={addImage}
                        removeImage={removeImage}
                        images={state.inputValues.images}
                        count={MAXIMAGES} />
                </div>

                {state.variantFlow === 'default' && <div className="col-12 my-3">
                    <div className="border rounded p-3">
                        <div className="fw-semibold mb-3">Produit sans variant</div>

                        <div className="d-flex flex-wrap gap-4">
                            <div className="flex-grow-1" style={{ minWidth: 320 }}>
                                <div className="mb-3">
                                    <div className="d-flex gap-3 flex-wrap mt-2">
                                        <div style={{ minWidth: 220 }}>
                                            <label className="form-label">Prix</label>
                                            <NumberInput
                                                onChange={handleDefaultNumberChange}
                                                value={state.defaultVariant.price.toLocaleString()}
                                                name="default_variant_price"
                                                placeholder="Prix"
                                            />
                                        </div>
                                        <div style={{ minWidth: 220 }}>
                                            <label className="form-label">Prix promo</label>
                                            <NumberInput
                                                onChange={handleDefaultNumberChange}
                                                value={state.defaultVariant.special_price.toLocaleString()}
                                                name="default_variant_special_price"
                                                placeholder="Prix promo"
                                            />
                                        </div>
                                        <div style={{ minWidth: 220 }}>
                                            <label className="form-label">En stock *</label>
                                            <NumberInput
                                                onChange={handleDefaultNumberChange}
                                                value={state.defaultVariant.stock.toLocaleString()}
                                                name="default_variant_stock"
                                                placeholder="Stock"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                {state.variantFlow === 'variants' && <div className="col-12 my-3">
                    <div className="border rounded p-3">
                        <VariantGenerator
                            groups={state.groups}
                            onChangeGroups={(groups) => setState(s => ({ ...s, groups }))}
                            matrixRows={state.matrixRows}
                            onChangeMatrixRows={(rows) => setState(s => ({ ...s, matrixRows: rows }))}
                            baseSku={baseSku}
                            baseTitle={normalizeString(state.inputValues.title)}
                            defaultPrice={''}
                            defaultSpecialPrice={''}
                            defaultStock={''}
                            hideDisabled={state.hideDisabled}
                            onToggleHideDisabled={() => setState(s => ({ ...s, hideDisabled: !s.hideDisabled }))}
                        />
                    </div>
                </div>}
            </div>}

            {state.step === 'variants' && variant.current && <div className="col-12 my-4">
                <ProductVariantProvider>
                    <VariantsList />
                    <AddVariant />
                    <DeleteVariantsDialogue />
                </ProductVariantProvider>
            </div>}
        </Modal.Body>
        <Modal.Footer>
            <Button type="button" className="btn btn-outline-dark btn-sm" onClick={handleFinish}>
                {state.step === 'variants' ? 'Terminer' : 'Annuler'}
            </Button>
            {state.step === 'product' && <Button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                options={{ loading: state.loading }}>
                <i className="fa fa-check"></i> Enregistrer
            </Button>}
        </Modal.Footer>
    </>
})

export default AddProductBody;

'use client';

import React, { useState } from 'react';
import { AnnonceType, categories, subCategories } from './data';
import { useRouter } from 'next/navigation';
import StepFourForm from './StepFourForm';
import SelectField from './SelectField';

const AddAnnonceUI: React.FC = () => {
    const router = useRouter();

    const [step, setStep] = useState(1);

    const [selectedType, setSelectedType] = useState<AnnonceType | ''>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>();
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [submitStatus, setSubmitStatus] = useState("");

    const filteredCategories = selectedType
        ? categories.filter((category) => category.type === selectedType)
        : [];

    const filteredSubCategories = selectedCategoryId
        ? subCategories.filter((sub) => sub.categorie_id === selectedCategoryId)
        : [];

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value as AnnonceType;
        console.log({type})
        console.log(filteredCategories )
        setSelectedType(type);
        setSelectedCategory('');
        setSelectedSubCategory('');
        setSelectedCategoryId(undefined);
        setSelectedSubCategoryId(undefined);
        setStep(2);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryName = e.target.value;
        console.log({categoryName})
        setSelectedCategory(categoryName);
        const category = categories.find((cat) => cat.name === categoryName);
        if (category) {
            setSelectedCategoryId(category.id);
            setStep(3);
        }
        setSelectedSubCategory('');
    };

    const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const subCategoryName = e.target.value;
        setSelectedSubCategory(subCategoryName);
        const subCategory = subCategories.find((sub) => sub.name === subCategoryName);
        if (subCategory) {
            setSelectedSubCategoryId(subCategory.id);
            setStep(4);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            description,
            price,
            selectedType,
            selectedCategory,
            selectedCategoryId,
            selectedSubCategory,
            selectedSubCategoryId,
        });
    };

    return (
        <main className="min-h-screen">
            <div className="container mx-auto p-8">
                <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">
                    Bienvenue, Sidi !
                </h1>
                <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">
                    Ajouter une annonce
                </h2>
                <p className="text-center mb-8 text-gray-600 italic">
                    Les données ne sont pas encore stockées dans la base de données.
                </p>

                <ProgressBar step={step} totalSteps={4} />

                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
                >
                    {step > 0 && (
                        <div>
                            <SelectField
                                label="Type d'annonce"
                                id="type"
                                value={selectedType}
                                onChange={handleTypeChange}
                                options={Object.values(AnnonceType).map((type) => ({
                                    value: type,
                                    label: type.charAt(0).toUpperCase() + type.slice(1),
                                }))}
                            />
                        </div>
                    )}

                    {step > 1  && (
                        <div>
                            <SelectField
                                label="Catégorie"
                                id="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                options={filteredCategories.map((category) => ({
                                    value: category.name,
                                    label: category.name,
                                }))}
                                disabled={!selectedType}
                            />
                        </div>
                    )}

                    {step > 2 && (
                        <div>
                            <SelectField
                                label="Sous-catégorie"
                                id="subCategory"
                                value={selectedSubCategory}
                                onChange={handleSubCategoryChange}
                                options={filteredSubCategories.map((subCategory) => ({
                                    value: subCategory.name,
                                    label: subCategory.name,
                                }))}
                                disabled={!selectedCategory}
                            />
                        </div>
                    )}

                    {step > 3  && (
                        <div>
                            <StepFourForm
                                description={description}
                                setDescription={setDescription}
                                price={price}
                                setPrice={setPrice}
                            />




                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    id="submit"
                                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                                >
                                    Ajouter l'annonce
                                </button>
                                {submitStatus && <p>{submitStatus}</p>}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
};

// Composant pour la barre de progression
interface ProgressBarProps {
    step: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
    const percentage = (step / totalSteps) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
                className="bg-gray-700 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};



export default AddAnnonceUI;

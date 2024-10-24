"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AnnonceType, Category, SubCategory, categories, subCategories } from './data';
import { AnnonceSchema } from "./annonce.schema";
import { useI18n } from "@/locales/client"; 

export default function AddAnnonceUI({ lang = "ar" }) {
  const router = useRouter();
  const t = useI18n();

  const [selectedType, setSelectedType] = useState<AnnonceType | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as AnnonceType;
    setSelectedType(type);
    setSelectedCategory('');
    setFilteredCategories(categories.filter(category => category.type === type));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    const category = categories.find(category => category.name === categoryName);
    if (category) {
      setFilteredSubCategories(subCategories.filter(sub => sub.categorie_id === category.id));
      setSelectedCategoryId(category.id);
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategoryName = e.target.value;
    setSelectedSubCategory(subCategoryName);
    const subCategory = subCategories.find(subcategory => subcategory.name === subCategoryName);
    if (subCategory) {
      setSelectedSubCategoryId(subCategory.id);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">
          { t("addAnnonce.welcome")}, Sidi !
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">
          { t("addAnnonce.addNew") }
        </h2>
        <p className="text-center mb-8 text-gray-600 italic">
          { t("addAnnonce.mockedData") }
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6 relative">
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.annonceType") }
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={handleTypeChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">{ t("addAnnonce.selectType") }</option>
              <option value={AnnonceType.Location}>{ t("addAnnonce.location") }</option>
              <option value={AnnonceType.Vente}>{ t("addAnnonce.sale") }</option>
              <option value={AnnonceType.Service}>{ t("addAnnonce.service") }</option>
              <option value={AnnonceType.Autre}>{ t("addAnnonce.other") }</option>
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.category") }
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={!selectedType}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">{ t("addAnnonce.selectCategory") }</option>
              {filteredCategories.map(category => (
                  <option key={category.id} value={category.name}>
                  {category.name}
                </option>                
              ))}
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="subCategory" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.subCategory") }
            </label>
            <select
              id="subCategory"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              disabled={!selectedCategory}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">{ t("addAnnonce.selectSubCategory") }</option>
              {filteredSubCategories.map(subCategory => (
                <option key={subCategory.id} value={subCategory.name}>{subCategory.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.description") }
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="prix" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.price") }
            </label>
            <input
              type="number"
              id="prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              id="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            >
              { t("addAnnonce.submitButton") }
            </button>
            {submitStatus && <p>{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link"; 
import React from "react";
import Image from "next/image";   
import { Annonce } from "@/app/types";

import { useRouter } from "next/navigation";

export default function PaginationUI(props: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();

  const handleClickToNextPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage + 1;
    router.push(`?page=${nextPage}`);
  };

  const handleClickPrevPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage - 1;
    router.push(`?page=${nextPage}`);
  };

  return (
    <>
      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => handleClickPrevPage()}
          disabled={props.currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="py-2 px-4">
          Page {props.currentPage} sur {props.totalPages}
        </span>
        <button 
          onClick={() => handleClickToNextPage()}
          disabled={props.currentPage === props.totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </>
  );
}





const fallbackImageUrl = "/noimage.jpg";
function getValidImageUrl(url: string | undefined): string { 
  return typeof url === "string" && url.trim() !== "" ? url : fallbackImageUrl;
}
function AnnonceItemUI(annonce: Annonce) {
    const getImage = () => {
        const hostServerForImages = "https://picsum.photos"
        const imgUrl = `${hostServerForImages}/${annonce.firstImagePath}`
        return (<>
          <Image
            src={imgUrl}
            alt={annonce.description}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </>)
      } 
  return (
    <>
      <article className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative h-48 w-full">
            
            {
            annonce.haveImage && (getImage())
          }
          {
            !annonce.haveImage && (<Image
              src={fallbackImageUrl}
              alt={annonce.description}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />)
          }
         
        </div>
        <div className="p-6 flex-grow">
          <h2 className="text-xl font-semibold mb-2">
            {annonce.description.slice(0, 5)}
          </h2>
          <p className="text-gray-600 mb-2">{annonce.description}</p>
          <p className="text-lg font-bold">{annonce.price}€ / jour</p>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
            {annonce.categorieName}
          </span>
        </div>
      </article>
    </>
  );
}


export  function MyListAnnoncesUI(
  { totalPages, currentPage, annonces }: { totalPages: number ;currentPage: number; annonces: Annonce[] },
) { 
  return (
    <>
      <div className="container mx-auto"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <Link
              href={`/my/details/${annonce.id}`}
              key={annonce.id}
              className="block"
            >
              <AnnonceItemUI {...annonce} />
            </Link>
          ))}
        </div>
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}

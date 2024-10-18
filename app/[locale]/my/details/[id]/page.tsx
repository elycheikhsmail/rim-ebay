import React from "react";
import MyAnnonceDetailsUI from "./ui"; 
import { handleGetOneAnnonce } from "./page.handlers/handleGetOneAnnonce";
 
export default async function AnnonceDetail(
  { params }: { params: { id: string } },
) {
  const annonceId = parseInt(params.id); 
  console.log({annonceId})
  const annonce  = await handleGetOneAnnonce(annonceId) 
 

  if (!annonce) {
    return (
      <h1 className="text-3xl font-bold text-center mt-16 text-red-600">
        Annonce non trouvée
      </h1>
    );
  }

  return <MyAnnonceDetailsUI annonceId={annonceId} annonce={annonce} />;
}

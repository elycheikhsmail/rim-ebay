import AnnonceDetailCompo from "./ui";
import { handleGetOneAnnonce } from "./page.handlers/handleGetOneAnnonce";
  
export default async function AnnonceDetail(
  { params }: { params: { id: string } },
) {
  const annonceId = parseInt(params.id); 

  const annonce  = await handleGetOneAnnonce(annonceId) 
  
  if (!annonce) {
    return (
      <h1 className="text-2xl font-bold text-center mt-8">
        Annonce non trouvée
      </h1>
    );
  }

  return <AnnonceDetailCompo annonceId={annonceId} annonce={annonce} />;
}

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

  return (
    <div  className="p-4 sm:p-6 md:p-9 overflow-hidden">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center md:text-left md:ml-32 lg:ml-96">Details de l`annoce</h1>
         <AnnonceDetailCompo annonceId={annonceId} annonce={annonce} />
    </div>
  
  );
}

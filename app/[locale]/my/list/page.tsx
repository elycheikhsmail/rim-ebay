import { Suspense } from "react";
import { handleGetAnnonces } from "./page.handlers/handleGetAnnonces";
import { MyListAnnoncesUI } from "./ui";

export default async function Home(
  {
    searchParams,
  }: {
    searchParams?: {
      page?: string;
    };
  },// Ajout d'un paramètre de contexte par défaut
) {

  const currentPage = Number(searchParams?.page) || 1;

  const { pageAnnonceData, errorMessage } = await handleGetAnnonces();

  return (
    <main className="min-h-screen">
      <div className="p-8">
        {/* <h1 className="text-3xl font-bold mb-4 text-center">
          Bienvenue, Sidi !
        </h1> */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Mes Annonces
        </h2>
        {/* <p className="text-center mb-8 text-gray-600">
          Les données ne sont pas encore stockées dans la base de données
          mocked.
        </p> */}
        <Suspense>
          {errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
            pageAnnonceData && (
              <MyListAnnoncesUI
                totalPages={pageAnnonceData.totalPages}
                currentPage={currentPage}
                annonces={pageAnnonceData.annonces}
              />
            )
          )}
        </Suspense>
      </div>
    </main>
  );
}

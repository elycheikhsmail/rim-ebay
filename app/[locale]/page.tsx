import { handleGetAnnonces } from "./page.handlers/handleGetAnnonces";
import ListAnnoncesUI from "./ui/ListAnnoncesUI";
 

 

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
 
  const currentPage = Number(searchParams?.page) || 1;
  const { pageAnnonceData, errorMessage } = await handleGetAnnonces()

  return (
    <main className="min-h-screen">
      <div className="p-8">
      
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          pageAnnonceData && (
            <ListAnnoncesUI
              totalPages={pageAnnonceData.totalPages}
              currentPage={currentPage}
              annonces={pageAnnonceData.annonces}
            />
          )
        )}
      </div>
    </main>
  );
}

import type { Metadata } from "next"; 
import Locale from 'intl-locale-textinfo-polyfill'
import "./globals.css";
import ConditionalNav from "./layout/ConditionalNav";
import { Providers } from "./layout/providers";
 
export const metadata: Metadata = {
  title: "RIM IJAR",
  description: "trouver des maisons,appartement, voiture, engine a louer",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
    params:{
      locale:string
    }
}>) {
 
  const { direction: dir } = new Locale(params.locale).textInfo


  return (
    <html lang={params.locale} dir={dir}>
      <body
        className={`bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}
      >
        
       
        <Providers locale={params.locale}>
        <ConditionalNav lang={params.locale} />
        {children}
        </Providers>
      </body>
    </html>
  );
}

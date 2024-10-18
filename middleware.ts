// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'
 
const I18nMiddleware = createI18nMiddleware({
  locales: ['ar','fr'],
  defaultLocale: 'ar'
})
 
export function middleware(request: NextRequest) {

  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/my")) {
    const cookies = request.cookies;

    if (cookies.size === 0) {
      // Les cookies sont vides
      console.log("Aucun cookie trouvé");
      url.pathname = "/p/users/connexion";
    } else {
      const sessionId = cookies.get("sessionId");
      if (sessionId == undefined) {
        url.pathname = "/p/users/connexion";
      }  
    }
  }



  return I18nMiddleware(request)
}
 
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
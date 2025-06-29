import { NextResponse } from "next/server";




export   async function  middleware(request)  {
    const token = request.cookies.get("login")?.value;
 
  if(!token)
  {
      return NextResponse.redirect(new URL('https://tc-app-ssgz.onrender.com', request.url));
  }


    return NextResponse.next(); 
 
  
 
}
 export const config = {
  matcher: ["/new/:path*"]
};



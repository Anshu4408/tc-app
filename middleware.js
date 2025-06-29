import { NextResponse } from "next/server";




export   async function  middleware(request)  {
    const token = request.cookies.get("login")?.value;
 
  if(!token)
  {
      return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
  }


    return NextResponse.next(); 
 
  
 
}
 export const config = {
  matcher: ["/new/:path*"]
};



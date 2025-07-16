
import { NextResponse } from 'next/server';
import userModel from '@/models/userModel';
import mongoose from 'mongoose';
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(JSON.stringify({ error: "No code in request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }



  
  const tokenRes = await fetch("https://auth.delta.nitt.edu/api/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.DAUTH_CLIENT_ID,
      client_secret: process.env.DAUTH_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: "https://tc-app-nu.vercel.app/api/auth/callback",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok || !tokenData.id_token) {
    return new Response(JSON.stringify({ error: "Token exchange failed", details: tokenData }), {
      status: 500,
    });
  }


const accessToken = tokenData.access_token;

const userRes = await fetch("https://auth.delta.nitt.edu/api/resources/user", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const userData = await userRes.json();

await mongoose.connect("mongodb+srv://Anshu45:Anshukumar8%40@cluster0.cse6amd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const user=new userModel({
  email: userData.email,

  friends: [],
  messages: [],
});

console.log(userData);

  const response = NextResponse.redirect(new URL('https://tc-app-nu.vercel.app/new', req.url));
  response.cookies.set("login", true, {
    httpOnly: true,
    path: '/',
  });
   response.cookies.set("name", userData.name, {
    httpOnly: true,
    path: '/',
  });
   response.cookies.set("phone", userData.phoneNumber, {
    httpOnly: true,
    path: '/',
  });
   response.cookies.set("email", userData.email, {
    httpOnly: false,
    path: '/',
  });
   response.cookies.set("username", userData.email, {
    httpOnly: false,
    path: '/',
  });

  return response;
}
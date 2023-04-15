import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider  from 'next-auth/providers/credentials';


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GoogleClientId,
      clientSecret: process.env.GoogleClientSecret,
    }),
    AppleProvider({
        clientId: process.env.AppleClientId,
        clientSecret: process.env.AppleClientSecret,
    }),
    CredentialsProvider({
      id: 'dashboard',
      name: 'dashboard',
      credentials: {
        credential: {type: 'text'},
      },
      authorize: async (credentials)=>{
        const token = credentials.credential
        const ticket = await googleAuthClient.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_GOOGLE_ID
        })
        const payload = ticket.getPayload()
        if(!payload){
          throw new Error('Cannot extract payload from signin token')
          
        }
        const {email, name,sub,given_name,family_name,email_verified, picture:image,} = payload;
        if(!email) {
          throw new Error('Email not available');
        }
        
          const user  = {email, name , image}
          console.log("user----",user);
          return user;
      }
    })
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/signin',
  }
}

export default NextAuth(authOptions);
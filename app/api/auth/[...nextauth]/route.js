import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const response = await fetch(`http://stateserver.org:8080/cdr/api/auth/signin`,{
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json' ,
                    }
                })
                    if(response.ok){
                        const user = await response.json()
                        return user;
                    }
                    else{
                        return null;
                    }
            }
        })
    ],
    session: {strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ user, token }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = token.user;
          return session;
        },
       },
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/'
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
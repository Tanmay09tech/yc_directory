declare module "next-auth" {
  interface Session {
    id: string;
  }
  interface JWT{
    id:string;
  }
  interface Token {
    id: string;
  }
}
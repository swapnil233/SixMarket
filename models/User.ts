export default interface User {
    id: number;
    name: string;
    email: string;
    emailVerifiedAt: string | null;
    image: string | null;
}
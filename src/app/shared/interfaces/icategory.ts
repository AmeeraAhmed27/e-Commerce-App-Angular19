export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string; // You might consider using Date type if you plan to parse it
    updatedAt: string; // Same as above
}

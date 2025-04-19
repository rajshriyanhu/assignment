export interface Bouquet {
    _id: string;
    title: string;
    imageUrl: string;
    votes: number;
    comments: Comment[];
    shares: Share[];
}

export interface Comment {
    _id: string;
    name: string;
    message: string;
    createdAt: Date;
    userId: string;
    bouquetId: string;
}

export interface Share {
    _id: string;
    bouquets: Bouquet[];
}
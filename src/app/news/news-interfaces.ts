export interface INew {
    thumbnail: string
    http: string;
    date: string; // For the purpose of stringifying MM-DD-YYYY date format
    internationalizations: INewInternationalization[];
}

export interface INewInternationalization {
    language: string;
    title: string;
    description: string;
}
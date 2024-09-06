export interface ResponsePagination<T> {
    results: T[];
    next: string;
    previous: string;
    count: number;
}
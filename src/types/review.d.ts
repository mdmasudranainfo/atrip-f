export interface Review {
    id: number
    title: string
    content: string
    created_at: string
    rate_number: number
    user_name: string
    user?: {
        name: string
        country: string
    }
    author?: {
        first_name: string
        last_name: string
        name: string
        country?: string
    }
}
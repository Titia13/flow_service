export interface Template {
    id?: string;
    _id: string;
    application_id?: string;
    filename?: string;
    type?: string;
    engine?: string;
    is_active?: boolean;
    version?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;
}
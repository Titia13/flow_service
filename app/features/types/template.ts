export interface TemplateOK {
    id?: string;
    _id?: string;
    application_id: App ;
    filename?: string;
    type?: string;
    engine?: string;
    is_active?: boolean;
    is_deleted?: boolean;
    version?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Template {
    id?: string;
    _id?: string;
    application_id?: string ;
    filename?: string;
    type?: string;
    engine?: string;
    is_active?: boolean;
    is_deleted?: boolean;
    version?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface App {
    _id: string;
    id?: string;
    name?: string;
}

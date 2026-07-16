export interface FileTemplate {
    id?: string;
    _id: string;
    application_id: App | string;
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
    _id?: string;
    id?: string;
    name?: string;
    code?: string;
}

export interface Template {
    id?: string;
    _id?: string;
    application_id?: App | string;
    filename?: string;
    name?: string;
    type?: string;
    engine?: string;
    is_active?: boolean;
    is_deleted?: boolean;
    version?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface PayloadPdf{
    _id?: string;
    id?: string;
    application_id: App | string; 
    filename?: string;
    app_code: string;
    meta_data?: Record<string, any> | null;
}

export interface PdfTemplate{
    // _id: string;
    // application_id: App | string;
    application_id: string;
    filename?: string;
    meta_data?: Record<string, any> | null;
}

//  polymorphe
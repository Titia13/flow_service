export interface User {
    id?: string;
    _id?: string;
    name?: string ;
    firstname?: string;
    email?: string;
    password?: string;
    role?: string;
    is_active?: boolean;
    is_deleted?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface Role {
    admin?: string;
    editor?: string;
}
export interface Result {
    status: 'error' | 'success' | string;
    message: string;
    projects?: any;
}

export interface Default {
    createdAt?: string;
    updatedAt?: string;
}

export interface IProject {
    id?: number;
    name: string;
    client: string;
    date: string;
    checked: boolean;
}

export interface IResource {
    ResourceId?: null | number;
    BordereauResource?: BordereauResource;
    id?: number;
    code?: string;
    description?: string;
    unit?: string;
    unit_price?: number;
    type?: number;
    fixed_price?: boolean;
}

export interface ITeamResource {
    id: number;
    unit_quantity: number;
    TeamId: number;
    TeamResourceId: number;
}

export interface TeamResource extends IResource {
    TeamResources: ITeamResource;
}

export interface IResourceType {
    id: number;
    type: string;
    parent_type: number;
}

export interface IResourceSubType {
    id: number;
    subtype: string;
}

// #########################
// #########################

export interface ResourceSubTypes {
    id: number;
    subtype: string;
    Resources: IResource[];
}

export interface ResourceType extends IResourceType {
    children: ResourceType[];
    items: IResource[];
    expanded: boolean;
}

export interface BordereauResource {
    BordereauId?: number | null;
    ResourceId?: number | null;
    duration?: number | null;
    id?: number;
    production?: number | null;
    quantity?: number;
}
export interface Bordereau {
    id?: number;
    code?: number | null;
    description?: string;
    quantity?: number;
    unit?: string;
    unit_price?: number;
    total_price?: number;
    total_price_vendant?: number;
    BordereauId?: number | null;
    children?: IResource[] | Bordereau[];
    Resources?: IResource[];
    type?: string;
    BordereauResource?: BordereauResource;
}

export interface Position {
    x: number;
    y: number;
}

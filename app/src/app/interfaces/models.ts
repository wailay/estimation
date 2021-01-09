export interface Default {
    createdAt?: string;
    updatedAt?: string;
}

export interface IProject {
    id: number;
    name: string;
    client: string;
    date: string;
}

export interface IResource {
    id: number;
    code: string;
    description: string;
    unit: string;
    unit_price: number;
    type?: number;
    fixed_price?: boolean;
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

export interface Position {
    x: number;
    y: number;
}

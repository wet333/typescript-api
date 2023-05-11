type Documentation = {
    method: string;
    endpoint: string;
    description: string;
    instructions?: string;
}

export class APIDocumentation {

    private static instance: APIDocumentation;
    public endpointDocsList: Documentation[] = [];

    private constructor(){}

    public static getInstance = () => {
        if (!this.instance) {
            this.instance = new APIDocumentation();
        } 
        return this.instance;
    }

    public addEndpointDocumentation = (doc: Documentation) => {
        this.endpointDocsList.push(doc);
    }

    public getAllEndpointDocumentations = () => {
        return this.endpointDocsList;
    }

}
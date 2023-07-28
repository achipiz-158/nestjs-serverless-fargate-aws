export interface Consultation {
  where?: Where | any;
  relations?: string[];
  take?: number;
}

interface Where {
  id?: string;
  published?: boolean;
}

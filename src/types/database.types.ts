
export interface Plant {
  id: string;
  created_at: string;
  nome: string;
  usuario: string;
  nome_completo: string;
  codigo_cliente: string;
  tipo_cliente: string;
  login: string;
  password_hash?: string;
  email: string;
  telefone: string;
  endereco: string;
  status: 'active' | 'inactive';
  power_capacity?: number; // kW
  installation_date?: string;
  last_maintenance?: string;
}

export interface Client {
  id: string;
  created_at: string;
  nome: string;
  usuario: string;
  nome_completo: string;
  codigo_cliente: string;
  tipo_cliente: string;
  login: string;
  password_hash?: string;
  email: string;
  telefone: string;
  endereco: string;
  since: string;
  plants?: string[]; // IDs of associated plants
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  name: string;
  role: 'company' | 'client';
  last_login?: string;
}

export interface Consumption {
  id: string;
  created_at: string;
  plant_id: string;
  client_id?: string;
  date: string;
  value: number; // kWh
  reading_type: 'actual' | 'estimated';
}

export interface Configuration {
  id: string;
  key: string;
  value: string;
  category: 'general' | 'database' | 'security';
  created_at: string;
  updated_at: string;
}


import { supabase } from '@/lib/supabase';
import { Client } from '@/types/database.types';
import { toast } from 'sonner';

export const clientsService = {
  // Get all clients
  getAllClients: async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data as Client[];
    } catch (error: any) {
      toast.error('Erro ao carregar clientes', {
        description: error.message || 'Por favor tente novamente',
      });
      return [];
    }
  },
  
  // Get client by ID
  getClientById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data as Client;
    } catch (error: any) {
      toast.error('Erro ao carregar detalhes do cliente', {
        description: error.message || 'Por favor tente novamente',
      });
      return null;
    }
  },
  
  // Create new client
  createClient: async (client: Omit<Client, 'id' | 'created_at'>) => {
    try {
      const clientData = {
        ...client,
        created_at: new Date().toISOString(),
      };
      
      // Remove password from the object before sending to Supabase
      const { password_hash, ...clientToSave } = clientData;
      
      const { data, error } = await supabase
        .from('clients')
        .insert([clientToSave])
        .select();
        
      if (error) throw error;
      
      toast.success('Cliente cadastrado com sucesso!', {
        description: `${client.nome} foi adicionado ao sistema.`,
      });
      
      return data[0] as Client;
    } catch (error: any) {
      toast.error('Erro ao cadastrar cliente', {
        description: error.message || 'Por favor tente novamente',
      });
      throw error;
    }
  },
  
  // Update client
  updateClient: async (id: string, client: Partial<Client>) => {
    try {
      const { password_hash, ...clientToUpdate } = client;
      
      const { data, error } = await supabase
        .from('clients')
        .update(clientToUpdate)
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      toast.success('Cliente atualizado com sucesso!');
      
      return data[0] as Client;
    } catch (error: any) {
      toast.error('Erro ao atualizar cliente', {
        description: error.message || 'Por favor tente novamente',
      });
      throw error;
    }
  },
  
  // Delete client
  deleteClient: async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Cliente removido com sucesso!');
      
      return true;
    } catch (error: any) {
      toast.error('Erro ao remover cliente', {
        description: error.message || 'Por favor tente novamente',
      });
      return false;
    }
  }
};

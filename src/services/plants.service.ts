
import { supabase } from '@/lib/supabase';
import { Plant } from '@/types/database.types';
import { toast } from 'sonner';

export const plantsService = {
  // Get all plants
  getAllPlants: async () => {
    try {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data as Plant[];
    } catch (error: any) {
      toast.error('Erro ao carregar usinas', {
        description: error.message || 'Por favor tente novamente',
      });
      return [];
    }
  },
  
  // Get plant by ID
  getPlantById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data as Plant;
    } catch (error: any) {
      toast.error('Erro ao carregar detalhes da usina', {
        description: error.message || 'Por favor tente novamente',
      });
      return null;
    }
  },
  
  // Create new plant
  createPlant: async (plant: Omit<Plant, 'id' | 'created_at'>) => {
    try {
      // Hash password (in real implementation, this would be done on the server)
      const plantData = {
        ...plant,
        status: 'active', // Default status
        created_at: new Date().toISOString()
      };
      
      // Remove password from the object before sending to Supabase
      const { password_hash, ...plantToSave } = plantData;
      
      const { data, error } = await supabase
        .from('plants')
        .insert([plantToSave])
        .select();
        
      if (error) throw error;
      
      toast.success('Usina cadastrada com sucesso!', {
        description: `${plant.nome} foi adicionada ao sistema.`,
      });
      
      return data[0] as Plant;
    } catch (error: any) {
      toast.error('Erro ao cadastrar usina', {
        description: error.message || 'Por favor tente novamente',
      });
      throw error;
    }
  },
  
  // Update plant
  updatePlant: async (id: string, plant: Partial<Plant>) => {
    try {
      const { password_hash, ...plantToUpdate } = plant;
      
      const { data, error } = await supabase
        .from('plants')
        .update(plantToUpdate)
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      toast.success('Usina atualizada com sucesso!');
      
      return data[0] as Plant;
    } catch (error: any) {
      toast.error('Erro ao atualizar usina', {
        description: error.message || 'Por favor tente novamente',
      });
      throw error;
    }
  },
  
  // Delete plant
  deletePlant: async (id: string) => {
    try {
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Usina removida com sucesso!');
      
      return true;
    } catch (error: any) {
      toast.error('Erro ao remover usina', {
        description: error.message || 'Por favor tente novamente',
      });
      return false;
    }
  }
};

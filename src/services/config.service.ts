
import { supabase } from '@/lib/supabase';
import { Configuration } from '@/types/database.types';
import { toast } from 'sonner';

export const configService = {
  // Get all configuration settings
  getAllConfig: async () => {
    try {
      const { data, error } = await supabase
        .from('configurations')
        .select('*');
        
      if (error) throw error;
      
      return data as Configuration[];
    } catch (error: any) {
      toast.error('Erro ao carregar configurações', {
        description: error.message || 'Por favor tente novamente',
      });
      return [];
    }
  },
  
  // Get configuration by category
  getConfigByCategory: async (category: 'general' | 'database' | 'security') => {
    try {
      const { data, error } = await supabase
        .from('configurations')
        .select('*')
        .eq('category', category);
        
      if (error) throw error;
      
      return data as Configuration[];
    } catch (error: any) {
      toast.error('Erro ao carregar configurações', {
        description: error.message || 'Por favor tente novamente',
      });
      return [];
    }
  },
  
  // Save configuration
  saveConfig: async (key: string, value: string, category: 'general' | 'database' | 'security') => {
    try {
      // Check if setting already exists
      const { data: existingConfig } = await supabase
        .from('configurations')
        .select('*')
        .eq('key', key)
        .single();
      
      if (existingConfig) {
        // Update existing setting
        const { error } = await supabase
          .from('configurations')
          .update({ 
            value, 
            updated_at: new Date().toISOString() 
          })
          .eq('key', key);
          
        if (error) throw error;
      } else {
        // Insert new setting
        const { error } = await supabase
          .from('configurations')
          .insert([{
            key,
            value,
            category,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
          
        if (error) throw error;
      }
      
      return true;
    } catch (error: any) {
      toast.error('Erro ao salvar configuração', {
        description: error.message || 'Por favor tente novamente',
      });
      return false;
    }
  },
  
  // Save multiple configurations at once
  saveBulkConfig: async (configs: { key: string; value: string; category: 'general' | 'database' | 'security' }[]) => {
    try {
      for (const config of configs) {
        await configService.saveConfig(config.key, config.value, config.category);
      }
      
      toast.success('Configurações salvas com sucesso!');
      return true;
    } catch (error: any) {
      toast.error('Erro ao salvar configurações', {
        description: error.message || 'Por favor tente novamente',
      });
      return false;
    }
  }
};


import { supabase } from '@/lib/supabase';
import { User } from '@/types/database.types';
import { toast } from 'sonner';

export const authService = {
  // Get current user
  getCurrentUser: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error fetching session:', error);
      return null;
    }
    
    if (!session) return null;
    
    try {
      // Get the user profile from our users table
      const { data, error: userError } = await supabase
        .from('users')
        .select()
        .eq('id', session.user.id)
        .single();
        
      if (userError) throw userError;
      
      return data as User;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  },
  
  // Sign in with email and password
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      // Update last login time
      if (data.user) {
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);
      }
      
      return data;
    } catch (error: any) {
      toast.error('Erro ao fazer login', {
        description: error.message || 'Verifique suas credenciais e tente novamente',
      });
      throw error;
    }
  },
  
  // Sign out
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return true;
    } catch (error: any) {
      toast.error('Erro ao fazer logout', {
        description: error.message || 'Por favor tente novamente',
      });
      return false;
    }
  }
};

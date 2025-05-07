import { supabase } from '../supabase';

export const uploadMedicalFile = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  // Dosyayı yükle
  const { error } = await supabase.storage
    .from('medical-files')
    .upload(filePath, file);

  if (error) throw error;

  // Public URL al
  const { data } = supabase.storage
    .from('medical-files')
    .getPublicUrl(filePath);

  return data.publicUrl;
}; 
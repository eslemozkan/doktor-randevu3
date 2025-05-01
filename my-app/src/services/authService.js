import { supabase } from '../supabase';

const formatErrorMessage = (error) => {
  if (error.message.includes('You can only request this after')) {
    return 'Lütfen birkaç saniye bekleyip tekrar deneyin.';
  }
  if (error.message.includes('Invalid login credentials')) {
    return 'Email veya şifre hatalı.';
  }
  if (error.message.includes('User already registered')) {
    return 'Bu email adresi zaten kayıtlı.';
  }
  if (error.message.includes('Password should be at least 6 characters')) {
    return 'Şifre en az 6 karakter olmalıdır.';
  }
  return 'Bir hata oluştu. Lütfen tekrar deneyin.';
};

export const registerUser = async (email, password) => {
  try {
    // Önce profiles tablosunda email kontrolü yap
    const { data: existingProfiles } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email);

    if (existingProfiles?.length > 0) {
      throw new Error('Bu email adresi zaten kayıtlı.');
    }

    // Kullanıcı kaydı oluştur
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (!data.user) {
      throw new Error('Kullanıcı oluşturulamadı');
    }

    // Profile oluştur
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          email: email
        }
      ]);

    if (profileError) {
      console.error('Profile error:', profileError);
      // Profile oluşturma hatası olsa bile kullanıcı kaydını tamamla
      return { user: data.user, error: null };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Registration error:', error);
    return { user: null, error: formatErrorMessage(error) };
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: formatErrorMessage(error) };
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: formatErrorMessage(error) };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    return { user: null, error: formatErrorMessage(error) };
  }
}; 
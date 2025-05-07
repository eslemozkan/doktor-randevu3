import { supabase } from '../supabase';

export const getUnavailableTimes = async (date) => {
  // date zaten 'YYYY-MM-DD' string ise, doğrudan kullan
  const dateStr = typeof date === 'string' ? date : new Date(date).toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('unavailable_times')
    .select('start_time, end_time, date')
    .eq('date', dateStr);

  console.log('Supabase data:', data, 'error:', error, 'date param:', dateStr);

  if (error) return [];

  let unavailable = [];
  data.forEach(({ start_time, end_time }) => {
    const start = parseInt(start_time.split(':')[0], 10);
    const end = parseInt(end_time.split(':')[0], 10);
    for (let h = start; h <= end; h++) {
      unavailable.push(h.toString().padStart(2, '0') + ':00:00');
    }
  });
  return unavailable;
}; 
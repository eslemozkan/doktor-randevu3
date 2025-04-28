import { supabase } from '../supabase'

export const getVideos = async () => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching videos:', error)
      throw error
    }

    console.log('Raw video data from Supabase:', JSON.stringify(data, null, 2))

    if (!data || data.length === 0) {
      console.warn('No videos found in the database')
      return []
    }

    // URL'leri düzelt
    const formattedData = data.map(video => {
      // Eğer video_url yoksa url alanını kullan
      const realVideoUrl = video.video_url && video.video_url.trim() !== "" ? video.video_url : video.url;

      if (!realVideoUrl) {
        console.warn('Video URL is missing for video:', video.id)
        return {
          ...video,
          video_url: '',
          thumbnail_url: ''
        }
      }

      let videoUrl = realVideoUrl;
      if (!videoUrl.startsWith('http')) {
        const encodedPath = encodeURIComponent(videoUrl);
        videoUrl = `https://xtezjzgzwckufeoziwfu.supabase.co/storage/v1/object/public/videos/${encodedPath}`;
      }

      // Thumbnail işlemleri aynı kalabilir
      let thumbnailUrl = video.thumbnail_url;
      if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
        const encodedThumbnailPath = encodeURIComponent(thumbnailUrl);
        thumbnailUrl = `https://xtezjzgzwckufeoziwfu.supabase.co/storage/v1/object/public/thumbnails/${encodedThumbnailPath}`;
      } else if (!thumbnailUrl) {
        thumbnailUrl = videoUrl.replace('.mp4', '.jpg');
      }

      return {
        ...video,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl
      }
    })

    console.log('Final formatted data:', JSON.stringify(formattedData, null, 2))
    return formattedData
  } catch (error) {
    console.error('Error in getVideos:', error)
    throw error
  }
} 
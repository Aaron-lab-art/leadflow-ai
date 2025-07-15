import axios from 'axios';

const DISCOVERY_API_URL = 'https://api.instagram.com/v1/discovery';

class LeadDiscoveryService {
  private accessToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem('instagram_access_token');
  }

  async searchByHashtags(hashtags: string[], limit = 100) {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    try {
      const response = await axios.post(`${DISCOVERY_API_URL}/hashtags`, {
        hashtags,
        limit
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      return this.filterLeads(response.data);
    } catch (error) {
      console.error('Hashtag search failed:', error);
      throw error;
    }
  }

  async searchByLocation(location: string, radius: number, limit = 100) {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    try {
      const response = await axios.post(`${DISCOVERY_API_URL}/location`, {
        location,
        radius,
        limit
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      return this.filterLeads(response.data);
    } catch (error) {
      console.error('Location search failed:', error);
      throw error;
    }
  }

  private filterLeads(users: any[]) {
    return users.filter(user => 
      user.profile_pic_url &&
      user.bio &&
      user.followers_count >= 100 &&
      user.followers_count <= 20000 &&
      !user.is_private &&
      (user.bio.toLowerCase().includes('roof') || 
       user.bio.toLowerCase().includes('contractor') ||
       user.bio.toLowerCase().includes('exterior') ||
       user.bio.toLowerCase().includes('storm'))
    );
  }
}

export default new LeadDiscoveryService();

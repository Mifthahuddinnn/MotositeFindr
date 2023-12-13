import API_ENDPOINT from "../globals/api-endpoint";

class MotorSource {
  static getAuthToken() {
    return localStorage.getItem('authToken');
  }

  static async listMotor() {
    try {
      const response = await fetch(API_ENDPOINT.LIST, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.motors;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async detailMotor(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id), {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.motor;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async postMotor(data) {
    try{
      const response = await fetch(API_ENDPOINT.POST_MOTOR, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: data,
      });

      if (response.ok){
        window.location.href = '#/searchpages';
      }
      const responseJson = await response.json();
      return responseJson;
    }catch (error){
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async register(data) {
    try{
      const response = await fetch(API_ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok){
        window.location.href = '#/login';
      }
      const responseJson = await response.json();
      return responseJson;
    }catch (error){
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async postComment(id, body) {
    try {
      const response = await fetch(API_ENDPOINT.COMMENT(id), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: { body } }),
      });
  
      if (response.ok) {
        return { success: true };
      }
  
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const responseJson = await response.json();
        return { success: false, message: responseJson.message || 'Gagal menambahkan komen!' };
      } 
        return { success: false, message: 'Unexpected response from the server' };
      
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  }  
}

export default MotorSource;
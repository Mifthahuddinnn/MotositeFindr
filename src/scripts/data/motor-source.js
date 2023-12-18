import Swal from 'sweetalert2';
import API_ENDPOINT from "../globals/api-endpoint";

class MotorSource {
  static getAuthToken() {
    return localStorage.getItem('authToken');


  }

  static async register(data) {
    try {
      const response = await fetch(API_ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Registration success
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered. Please login to continue.',
        });

        // Redirect to login page
        window.location.href = '#/login';
      } else {
        // Registration failed
        const responseJson = await response.json();
        const errorMessage = responseJson.message || 'Registration failed. Please try again.';

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async login(data) {
    try{
      const response = await fetch(API_ENDPOINT.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      // Store the token in localStorage
      if (responseData.token !== undefined) {
        // Store the token in localStorage
        localStorage.setItem('authToken', responseData.token);
  
        window.location.href = '#/searchPages';
        window.location.reload();
      } else {
        // Jika token undefined, tampilkan pesan login failed
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
        });
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      // Show a SweetAlert2 error message
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
      });
    } finally {
        // Reset loading state
        loginButton.textContent = 'Login';
        loginButton.disabled = false;
    }
  }

  static async listMotor() {
    const loader = document.getElementById('loader');
    
    // Show loader
    if(loader) loader.style.display = 'block';
  
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
  
      // Hide loader
      if(loader) loader.style.display = 'none';
  
      return responseJson.motors;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      // Hide loader in case of error
      if(loader) loader.style.display = 'none';
  
      throw error;
    }
  }

  static async detailMotor(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
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

  static async searchMotor(keyword){
    try{
      // eslint-disable-next-line prefer-template
      const response = await fetch(API_ENDPOINT.SEARCH_LIST + `?search=${keyword}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson;
    }catch (error){
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async getLatestMotor() {
    try {
      const response = await fetch(`${API_ENDPOINT.LIST}/search/?sortBy=terbaru`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.motors;
    } catch (error) {
      console.error('Error fetching latest motor data:', error);
      throw error;
    }
  }

  static async getOldestMotor() {
    try {
      const response = await fetch(`${API_ENDPOINT.LIST}/search/?sortBy=terlama`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.motors;
    } catch (error) {
      console.error('Error fetching oldest motor data:', error);
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
        return { success: false, message: 'Anda perlu login terlebih dahulu' };
      
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  }

  static async deleteMotor(id) {
    try{
      const response = await fetch(API_ENDPOINT.DELETE_POST(id),{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        window.location.href = '#/searchpages';
      }else if (response.status === 404) {
        console.error('User is not the owner of the post');
        Swal.fire({
          icon: 'error',
          title: 'Permission Denied',
          text: 'You do not have permission to delete this post.',
        });
      } else {
        // Handle other error cases
        console.error('Delete request failed:', response.status);
      }
    }catch (error){
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async deleteComment(idMotor, idComment) {
    try{
      const response = await fetch(API_ENDPOINT.DELETE_COMMENT(idMotor, idComment),{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        window.location.href = `#/detail/${idMotor}`;
        window.location.reload();
      }else if (response.status === 403) {
        console.error('User is not the owner of the comment');
        Swal.fire({
          icon: 'error',
          title: 'Permission Denied',
          text: 'You do not have permission to delete this comment.',
        });
      } else {
        // Handle other error cases
        console.error('Delete request failed:', response.status);
      }
    }catch (error){
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default MotorSource;
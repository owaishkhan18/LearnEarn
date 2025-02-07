const API_BASE_URL = "http://localhost:5000"; 

export const apiCall = async (endpoint, method = "GET", data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),  // Add token header if provided
  };

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),  // Add body if data is provided
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      // Throw error if response is not successful (status 2xx)
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred during the API call.");
    }

    return await response.json();  // Parse and return JSON response

  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};


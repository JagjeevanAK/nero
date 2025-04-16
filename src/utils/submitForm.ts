export async function submitToGoogleSheet(formData: any): Promise<string> {
    const endpoint = import.meta.env.VITE_GOOGLE_FORM_ENDPOINT;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Error submitting form:", error);
      return "Error submitting form";
    }
  }
  
// ============================================
// n8n WEBHOOK URL
// ============================================

const WEBHOOK_URL =
  "http://localhost:5678/webhook-test/student-dashboard";

// ============================================
// COMMON API REQUEST
// ============================================

export const apiRequest = async ({ action, data }) => {
  try {
    console.log("====================================");
    console.log("ACTION:", action);
    console.log("DATA SENT TO N8N:", data);
    console.log("====================================");

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        data,
      }),
    });

    const text = await response.text();

    console.log("RAW N8N RESPONSE:", text);

    if (!response.ok) {
      throw new Error(
        `n8n returned HTTP ${response.status}`
      );
    }

    if (!text) {
      return {
        success: false,
        message: "Empty response received from n8n.",
      };
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      console.error("JSON PARSE ERROR:", error);

      return {
        success: false,
        message: "Invalid JSON response from n8n.",
        rawResponse: text,
      };
    }

    console.log("PARSED N8N RESPONSE:", result);

    // ============================================
    // IMPORTANT:
    // RETURN THE COMPLETE N8N RESPONSE
    // ============================================

    return result;

  } catch (error) {
    console.error("API REQUEST ERROR:", error);

    return {
      success: false,
      message:
        error.message ||
        "Unable to connect to n8n.",
    };
  }
};

// ============================================
// CGPA
// ============================================

export const calculateCGPA = async (semesters) => {
  return await apiRequest({
    action: "calculateCGPA",

    data: {
      semesters: semesters,
    },
  });
};

// ============================================
// LOGIN
// ============================================

export const loginStudent = async (
  email,
  password
) => {
  return await apiRequest({
    action: "login",

    data: {
      email: email,
      password: password,
    },
  });
};

// ============================================
// REGISTER
// ============================================

export const registerStudent = async (data) => {
  return await apiRequest({
    action: "register",

    data: data,
  });
};

// ============================================
// GRADES
// ============================================

export const getGrades = async (email) => {
  return await apiRequest({
    action: "getGrades",

    data: {
      email: email,
    },
  });
};

// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = async (email) => {
  try {
    if (!email) {
      throw new Error(
        "Email is required to get profile"
      );
    }

    const response = await apiRequest({
      action: "getProfile",

      data: {
        email: email,
      },
    });

    console.log(
      "===================================="
    );
    console.log(
      "GET PROFILE FINAL RESPONSE:"
    );
    console.log(response);
    console.log(
      "===================================="
    );

    return response;

  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    throw error;
  }
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (
  profileData
) => {
  try {
    if (
      !profileData ||
      !profileData.email
    ) {
      throw new Error(
        "Profile email is required"
      );
    }

    const response = await apiRequest({
      action: "updateProfile",

      data: profileData,
    });

    console.log(
      "===================================="
    );
    console.log(
      "UPDATE PROFILE FINAL RESPONSE:"
    );
    console.log(response);
    console.log(
      "===================================="
    );

    return response;

  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    throw error;
  }
};

// ============================================
// FEEDBACK
// ============================================

export const sendToN8N = async (data) => {
  return await apiRequest({
    action: "feedback",

    data: data,
  });
};
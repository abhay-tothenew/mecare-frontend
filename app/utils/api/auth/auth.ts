const BASE_URL = "https://localhost:5000/api/users";

interface LoginUser {
  email: string;
  password: string;
}

interface RegisterUser {
  displayName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
}

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/allUsers`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching users", error);
  }
};

export const registerUser = async (user: RegisterUser) => {
  console.log("User-->", user);
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_type: user.userType,
        display_name: user.displayName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
      }),
    });

    console.log("response--->", response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error registering user", error);
  }
};

export const loginUser = async (user: LoginUser) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error logging in user", error);
  }
};

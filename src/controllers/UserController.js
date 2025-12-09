import fetch from "node-fetch";
import { UserModel } from "../models/UserModel.js";
import { convertKeysToCamelCase } from "../utils/normalizeData.js";

export const signup = async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    const { data: authData, error } = await UserModel.createAuthUser(
      email,
      password
    );
    if (error) return res.status(400).json({ error: error.message });

    const { data, error: userTableError } = await UserModel.createUser({
      id: authData.user.id,
      name,
      email,
      role,
    });

    if (userTableError) {
      await UserModel.deleteAuthUser(authData.user.id);
      return res.status(400).json({ error: userTableError.message });
    }

    const { data: sessionData, error: sessionError } =
      await UserModel.loginUser(email, password);
    if (sessionError)
      return res.status(400).json({ error: sessionError.message });

    const { access_token, refresh_token } = sessionData.session;

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ responseDetails: { user: data[0], accessToken: access_token } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await UserModel.loginUser(email, password);
    if (error) return res.status(400).json({ error: error.message });
    console.log("data", data);

    const { access_token, refresh_token } = data.session;
    const { data: userData } = await UserModel.getUserById(data.user.id);
    console.log("userData", userData);

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      responseDetails: { user: userData, accessToken: access_token },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchMe = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ error: "No refresh token found" });

    const response = await fetch(
      `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: process.env.SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    const data = await response.json();
    if (!response.ok)
      return res
        .status(response.status)
        .json({ error: data.error_description });

    const user = await UserModel.getUserById(data.user.id);

    res.json({
      responseDetails: {
        user: convertKeysToCamelCase(user.data),
        accessToken: data.access_token,
      },
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });
  res.json({ responseDetails: { message: "User Logged Out" } });
};

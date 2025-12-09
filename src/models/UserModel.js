import { convertKeysToCamelCase } from "../utils/normalizeData.js";
import { supabase } from "../db/supabase.js";

export const UserModel = {
  async createAuthUser(email, password) {
    return await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
  },

  async deleteAuthUser(id) {
    return await supabase.auth.admin.deleteUser(id);
  },

  async createUser(userData) {
    const { data, error } = await supabase
      .from("att_users")
      .insert(userData)
      .select();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async deleteUser(id) {
    return await supabase.from("att_users").delete().eq("id", id);
  },

  async getUserById(id) {
    const { data, error } = await supabase
      .from("att_users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async getAllUsers() {
    const { data, error } = await supabase.from("att_users").select("*");
    if (error) throw error;
    return { data: data.map(convertKeysToCamelCase) };
  },

  async updateUser(id, user) {
    const { data, error } = await supabase
      .from("att_users")
      .update(user)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async loginUser(email, password) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
};

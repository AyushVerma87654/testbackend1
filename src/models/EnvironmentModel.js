import { convertKeysToCamelCase } from "../utils/normalizeData.js";
import { supabase } from "../db/supabase.js";

export const EnvironmentModel = {
  async createEnvironment(envData) {
    const { data, error } = await supabase
      .from("att_environments")
      .insert(envData)
      .select()
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async getEnvironmentsByUserId(userId) {
    const { data, error } = await supabase
      .from("att_environments")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return { data: data.map(convertKeysToCamelCase) };
  },

  async getEnvironmentById(id) {
    const { data, error } = await supabase
      .from("att_environments")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async updateEnvironment(id, updateData) {
    const { data, error } = await supabase
      .from("att_environments")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async deleteEnvironment(id) {
    return await supabase.from("att_environments").delete().eq("id", id);
  },
};

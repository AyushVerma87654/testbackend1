import { convertKeysToCamelCase } from "../utils/normalizeData.js";
import { supabase } from "../db/supabase.js";

export const RequestModel = {
  async createRequest(requestData) {
    const { data, error } = await supabase
      .from("att_requests")
      .insert(requestData)
      .select()
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async getRequestsByCollectionId(collectionId) {
    const { data, error } = await supabase
      .from("att_requests")
      .select("*")
      .eq("collection_id", collectionId);
    if (error) throw error;
    return { data: data.map(convertKeysToCamelCase) };
  },

  async getRequestById(id) {
    const { data, error } = await supabase
      .from("att_requests")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async getRequestsByUserId(userId) {
    const { data, error } = await supabase
      .from("att_requests")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async updateRequest(id, updateData) {
    const { data, error } = await supabase
      .from("att_requests")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async deleteRequest(id) {
    return await supabase.from("att_requests").delete().eq("id", id);
  },
};

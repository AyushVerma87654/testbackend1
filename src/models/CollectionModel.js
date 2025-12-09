import { convertKeysToCamelCase } from "../utils/normalizeData.js";
import { supabase } from "../db/supabase.js";
import { RequestModel } from "./RequestModel.js";

export const CollectionModel = {
  async createCollection({ id, ...collectionData }) {
    const { data, error } = await supabase
      .from("att_collections")
      .insert(collectionData)
      .select()
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async getCollectionsByUserId(userId) {
    const { data, error } = await supabase
      .from("att_collections")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    const allRequests = (await RequestModel.getRequestsByUserId(userId)).data;
    const camelRequests = allRequests.map(convertKeysToCamelCase);

    const collectionsWithRequests = data.map((collection) => {
      const matchingRequests = camelRequests.filter(
        (req) => req.collectionId === collection.id
      );

      return {
        ...convertKeysToCamelCase(collection),
        requests: matchingRequests,
      };
    });

    return { data: collectionsWithRequests };
  },

  async getCollectionById(id) {
    const { data, error } = await supabase
      .from("att_collections")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;

    const camelCollection = convertKeysToCamelCase(data);
    const allRequests = (await RequestModel.getRequestsByCollectionId(id)).data;
    const camelRequests = allRequests.map(convertKeysToCamelCase);

    const collectionWithRequests = {
      ...camelCollection,
      requests: camelRequests,
    };

    return { data: collectionWithRequests };
  },

  async updateCollection(id, updateData) {
    const { data, error } = await supabase
      .from("att_collections")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return { data: convertKeysToCamelCase(data) };
  },

  async deleteCollection(id) {
    return await supabase.from("att_collections").delete().eq("id", id);
  },
};

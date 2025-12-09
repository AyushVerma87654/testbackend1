import { CollectionModel } from "../models/CollectionModel.js";
import { convertKeysToSnakeCase } from "../utils/normalizeData.js";

export const createCollection = async (req, res) => {
  try {
    const collectionData = req.body;
    const { data } = await CollectionModel.createCollection(
      convertKeysToSnakeCase(collectionData)
    );
    res.status(201).json({ responseDetails: { collection: data } });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ error: err.message });
  }
};

export const getCollectionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data } = await CollectionModel.getCollectionsByUserId(userId);
    res.status(200).json({ responseDetails: { collections: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await CollectionModel.getCollectionById(id);
    res.status(200).json({ responseDetails: { collection: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { data } = await CollectionModel.updateCollection(id, updateData);
    res.status(200).json({ responseDetails: { collection: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await CollectionModel.deleteCollection(id);
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import { RequestModel } from "../models/RequestModel.js";
import { convertKeysToSnakeCase } from "../utils/normalizeData.js";

export const createRequest = async (req, res) => {
  try {
    const requestData = req.body;
    console.log("requestData", requestData);
    const { data } = await RequestModel.createRequest(
      convertKeysToSnakeCase(requestData)
    );
    res.status(201).json({ responseDetails: { request: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRequestsByCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { data } = await RequestModel.getRequestsByCollectionId(collectionId);
    res.status(200).json({ responseDetails: { requests: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await RequestModel.getRequestById(id);
    res.status(200).json({ responseDetails: { request: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { data } = await RequestModel.updateRequest(
      id,
      convertKeysToSnakeCase(updateData)
    );
    res.status(200).json({ responseDetails: { request: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await RequestModel.deleteRequest(id);
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

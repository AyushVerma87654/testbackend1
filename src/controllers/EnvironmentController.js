import { EnvironmentModel } from "../models/EnvironmentModel.js";
import { convertKeysToSnakeCase } from "../utils/normalizeData.js";

export const createEnvironment = async (req, res) => {
  try {
    const envData = req.body;
    const { data } = await EnvironmentModel.createEnvironment(
      convertKeysToSnakeCase(envData)
    );
    res.status(201).json({ responseDetails: { environment: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEnvironmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data } = await EnvironmentModel.getEnvironmentsByUserId(userId);
    res.status(200).json({ responseDetails: { environments: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEnvironmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await EnvironmentModel.getEnvironmentById(id);
    res.status(200).json({ responseDetails: { environment: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEnvironment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { data } = await EnvironmentModel.updateEnvironment(id, updateData);
    res.status(200).json({ responseDetails: { environment: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEnvironment = async (req, res) => {
  try {
    const { id } = req.params;
    await EnvironmentModel.deleteEnvironment(id);
    res.status(200).json({ message: "Environment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

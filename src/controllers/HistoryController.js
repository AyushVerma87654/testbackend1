import { HistoryModel } from "../models/HistoryModel.js";

export const createHistory = async (req, res) => {
  try {
    const historyData = req.body;
    const { data } = await HistoryModel.createHistory(historyData);
    res.status(201).json({ responseDetails: { history: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data } = await HistoryModel.getHistoryByUser(userId);
    res.status(200).json({ responseDetails: { history: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistoryByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { data } = await HistoryModel.getHistoryByRequest(requestId);
    res.status(200).json({ responseDetails: { history: data } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await HistoryModel.deleteHistory(id);
    res.status(200).json({ message: "History deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

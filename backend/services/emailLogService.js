const EmailLog = require("../models/EmailLog");

/**
 * Create Email Log
 */
const createLog = async ({
  to,
  subject,
  type = "General",
  status = "Sent",
  errorMessage = "",
  messageId = "",
  trackingToken,
}) => {
  try {
    const data = {
      to,
      subject,
      type,
      status,
      errorMessage,
      messageId,
      trackingToken,
      sentAt: status === "Sent" ? new Date() : null,
    };
    return trackingToken ? await EmailLog.findOneAndUpdate({ trackingToken }, { $set: data }, { upsert: true, new: true }) : await EmailLog.create(data);
  } catch (error) {
    console.error(
      "Email log creation failed:",
      error.message
    );

    return null;
  }
};

/**
 * Get All Email Logs
 */
const getLogs = async () => {
  return EmailLog.find()
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Get Email Log By ID
 */
const getLogById = async (id) => {
  return EmailLog.findById(id).lean();
};

/**
 * Delete Email Log
 */
const deleteLog = async (id) => {
  return EmailLog.findByIdAndDelete(id);
};

/**
 * Delete All Email Logs
 */
const deleteAllLogs = async () => {
  return EmailLog.deleteMany({});
};

module.exports = {
  createLog,
  getLogs,
  getLogById,
  deleteLog,
  deleteAllLogs,
};

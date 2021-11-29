/* eslint-disable valid-jsdoc */
import db from '../database/models';
import { clients } from '../helpers/socket.helper';
import response from '../helpers/response.helper';

/**
 * This class contains functions for all notification service.
 * @class NotificationService
 */
class NotificationService {
  /**
   * Send notification
   * @param socket Event
   * @param { Number } receiverId User Id.
   * @param { String } title Notification title.
   * @param { String } message Custom message.
   * @param { Number } requestId Request Id.
   * @returns { Promise } Returns a notification query result object.
   */
  static async sendNotification(event, receiverId, title, message, requestId) {
    try {
      const data = {
        receiver: receiverId,
        requestId,
        title,
        message,
      };
      // get receiver data from database
      const receiverInfo = await db.findOne({ where: { id: receiverId } });
      // Save in database
      const result = await db.notification.create(data);
      data.id = result.dataValues.id;
      const client = clients[receiverInfo.id];
      if (client) {
        client.emit(event, data);
      }
    } catch (error) {
      const res = null;
      return response.errorMessage(res, error.message, 400);
    }
  }

  /**
   * get notifications
   * @param { Object } where example: `{ receiver, userId }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async getNotifications(where) {
    return db.notification.findAll({
      where,
      order: [
        ['read', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
  }

  /**
   * get a spesific notification
   * @param { Object } where example: `{ receiver, userId }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async getNotification(where) {
    const query = await db.notification.findOne({ where });
    if (query) return query;
  }

  /**
   * update notifications
   * @param { Object } where example: `{ receiver, userId }`.
   * @param { Object } data example: `{ read: true }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async updateNotifications(where, data) {
    const query = await db.notification.update(data, { where });
    return query;
  }

  /**
   * delete notifications
   * @param { Object } where example: `{ receiver, userId }`.
   * @param { Object } data example: `{ read: true }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async deleteNotifications(where) {
    const query = await db.notification.destroy({ where });
    return query;
  }
}
export default NotificationService;

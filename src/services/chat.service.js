/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import db from '../database/models';
import Queries from './Queries';

/**
 * This class contains all chat functionality
 * @class ChatService
 */

class ChatService {
  /**
   * save Chat Message
   * @param { Object } chatData
   * @returns { Promise } Returns a a saved message
   */

  static async saveMessage(chatData) {
    try {
      return Queries.create(db.chat, chatData);
    } catch (error) {
      return error;
    }
  }

  /**
   * get Private Message
   * @param { Integer } sender .
   * @param { Integer } receiver .
   * @returns { Promise } Returns a list of messages
   */
  static async getPrivateMessage(sender, receiver, page, size) {
    try {
      const privateMessages = Queries.getPrivateMessage(db.chat, sender, receiver, page, size);
      return privateMessages;
    } catch (error) {
      return error;
    }
  }

  /**
   * get Public Message
   * @returns { Promise } Returns a list of Public messages
   */
  static async getPublicMessage() {
    try {
      const publicMessages = await db.chat.findAll({
        where: {
          receiverId: null,
        },
      });
      return publicMessages;
    } catch (error) {
      return error;
    }
  }

  /**
   * service to all users in database
   // eslint-disable-next-line valid-jsdoc
   * @returns {Object} return user message
   */
  static async getAllUsers() {
    try {
      const searchUsers = await db.user.findAll({
        attributes: ['id', 'artisanId', 'firstName', 'lastName', 'avatar'],
      });
      return searchUsers;
    } catch (error) {
      return error;
    }
  }
}

export default ChatService;

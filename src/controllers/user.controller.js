/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import UserServices from '../services/user.service';
import db from '../database/models';

dotenv.config();

/**
 * Class for users related operations such Sign UP, Sign In and others
 */

class userController {
  /**
   * signup a user and saving user data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async signup(req, res) {
    try {
      const { username } = req.body;
      const existingUser = await UserServices.findExistingUser(username);
      if (existingUser) {
        return response.errorMessage(res, ' User already exist', 409);
      }
      const user = await db.user.create(req.body);
      const data = {
        userId: user.id,
        role: user.role,
        username: user.username,
      };
      return response.successMessage(
        res,
        'user created successfully',
        201,
        data
      );
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


}

export default userController;

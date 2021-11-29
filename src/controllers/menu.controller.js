/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import db from '../database/models';
import UserServices from '../services/user.service';

dotenv.config();

/** Function to list all users
 * @returns {*} data returned
 */
class MenuController {
  /** Function to list all users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async createMenu(req, res) {
    try {
      const { userId } = req.body;
      const user = await db.user.findOne({
        where: { id: userId } });
      if (user.role !== 'Vendor') {
        return response.errorMessage(res, ' Sorry you cant make this request', 409);
      }
      const menu = await db.menu.create(req.body);
      const data = {
        id: menu.id,
        foodType: menu.foodType,
        location: menu.location,
        userId,
        amount: menu.amount,
        image: menu.image,
        available: menu.available
      }
      return response.successMessage(
        res,
        'Menu Created',
        200,
        data
      )
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /** Get Private and public message between two users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async getFood(req, res) {
    try {
      const menu = await db.menu.findAll();
      return response.successMessage(res, 'Messages', 200, menu);
    } catch (error) {
      return response.errorMessage(res, error.message, 400);
    }
  }

  /** Get Private and public message between two users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async getOneFood(req, res) {
    try {
      const id = req.params.id;
      const menu = await db.menu.findOne({ where: { id } });
      if (!menu) {
        return response.errorMessage(res, 'No record found', 400);
      }
      return response.successMessage(res, 'Messages', 200, menu);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /** Get Private and public message between two users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async getLocationFood(req, res) {
    try {
      const location = req.params.location;
      const menu = await db.menu.findAll({ where: { location } });
      if (!menu) {
        return response.errorMessage(res, 'Location not available', 400);
      }
      return response.successMessage(res, 'Messages', 200, menu);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /** Get Private and public message between two users
   * @param {object} req the request sent
   * @param {object} res the response returned
   * @returns {*} data returned
   */
  static async orderFood(req, res) {
    try {
      const id = req.params.id;
      const menu = await db.menu.findOne({ where: { id } });
      if (!menu) {
        return response.errorMessage(res, 'No record found', 400);
      }
      menu.update({available: false })
      return response.successMessage(res, 'Messages', 200, menu);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}

export default MenuController;

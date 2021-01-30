/* eslint-disable prefer-destructuring */
/* eslint-disable no-mixed-operators */
import info from "../info";

/**
 * @class RuleController
 * @description display user details validate rule
 * @exports RuleController
 */
class RuleController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async base(req, res) {
    try {
      return res.status(200).json({
        message: "My Rule-Validation API",
        status: "success",
        data: info
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async rate(req, res) {
    try {
      const { rule, data } = req.body;

      if (!rule) {
        return res.status(400).json({
          message: "rule is required.",
          status: "error",
          data: null
        });
      }
      if (!data) {
        return res.status(400).json({
          message: "data is required.",
          status: "error",
          data: null
        });
      }
      console.log(typeof req.body);

      if (typeof rule !== "object") {
        return res.status(400).json({
          message: "rule should be an object.",
          status: "error",
          data: null
        });
      }
      if (typeof data !== "object") {
        return res.status(400).json({
          message: "data should be an object.",
          status: "error",
          data: null
        });
      }
      if (typeof req.body !== "object") {
        return res.status(400).json({
          message: "Invalid JSON payload passed.",
          status: "error",
          data: null
        });
      }

      let value = "";
      let x = rule.field;
      let y = x.split(".");
      let newValue = "";

      if (x.includes(".")) {
        value = y[1];
        if (value in data[y[0]]) {
          newValue = data[y[0]][value];
        } else {
          return res.status(400).json({
            message: `field ${value} is missing from data.`,
            status: "error",
            data: null
          });
        }
      }

      if (!(x.includes("."))) {
        value = x;

        if (value in data) {
          newValue = data[value];
        } else {
          return res.status(400).json({
            message: `field ${value} is missing from data.`,
            status: "error",
            data: null
          });
        }
      }

      if (rule.condition === "eq" || "contains" && newValue === rule.condition_value) {
        return res.status(200).json({
          message: `field ${rule.field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      } if (rule.condition === "eq" && newValue !== rule.condition_value) {
        return res.status(400).json({
          message: `field ${rule.field} failed validation.`,
          status: "failed",
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      }

      if (rule.condition === "contains" && newValue === rule.condition_value) {
        return res.status(200).json({
          message: `field ${rule.field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      } if (rule.condition === "contains" && newValue !== rule.condition_value) {
        return res.status(400).json({
          message: `field ${rule.field} failed validation.`,
          status: "failed",
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      }

      if (rule.condition === "neq" && newValue !== rule.condition_value) {
        return res.status(200).json({
          message: `field ${rule.field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      } if (rule.condition === "neq" && newValue === rule.condition_value) {
        return res.status(400).json({
          message: `field ${rule.field} failed validation.`,
          status: "failed",
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      }

      if (rule.condition === "gt" && newValue > rule.condition_value) {
        return res.status(200).json({
          message: `field ${rule.field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      } if (rule.condition === "gt" && newValue < rule.condition_value) {
        return res.status(400).json({
          message: `field ${rule.field} failed validation.`,
          status: "failed",
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      }

      if (rule.condition === "gte" && newValue >= rule.condition_value) {
        return res.status(200).json({
          message: `field ${rule.field} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      } if (rule.condition === "gte" && newValue <= rule.condition_value) {
        return res.status(400).json({
          message: `field ${rule.field} failed validation.`,
          status: "failed",
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: data.missions,
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
        });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }
}
export default RuleController;

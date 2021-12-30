export default class Validator {
  constructor(config) {
    if (!config || typeof config !== "object")
      throw new Error("validator config error");

    this.validators = this._configParser(config);
  }

  // req fields

  body() {
    return ((req, res, next) => {
      const errors = {};
      for (const field of Object.keys(this.validators)) {
        for (const v of this.validators[field]) {
          if (!req.body[field]) req.body[field] = "";
          const validator = `_${v.validator}Validator`;
          const error = this[validator](
            req.body[field].trim(),
            field,
            ...v.params
          );

          if (typeof error === "object" && error.field) {
            if (!(error.field in errors)) errors[error.field] = { errors: [] };
            errors[error.field].errors.push(error.message);
          }
        }
      }

      if (Object.keys(errors).length) {
        errors.succes = false;
        res.status(400);
        res.json(errors);
        return;
      } else {
        next();
      }
    }).bind(this);
  }

  // parsers

  _configParser(config) {
    const fields = Object.keys(config.validators);
    const validatorsConfig = {};

    for (const field of fields) {
      const validator = this._paramsParser(config.validators[field]);
      if (!validatorsConfig[field]) validatorsConfig[field] = [];
      for (const a of validator) {
        validatorsConfig[field].push(a);
      }
    }
    return validatorsConfig;
  }

  _paramsParser(rawDate) {
    const validators = rawDate.split("|");
    const result = [];
    let params;

    for (const v of validators) {
      const validator = v.match(/\w+/)[0];
      const rawParams = v.match(/(?<=:).+$/);
      if (rawParams) params = this._adductionTypes(rawParams[0]);
      params = params ?? [];

      result.push({ validator, params });
    }

    return result;
  }

  _adductionTypes(rawTypes) {
    const result = [];

    for (const rawType of rawTypes.split(",")) {
      const [param, type] = rawType.split("#");
      result.push(global[type](param));
    }

    return result;
  }

  // validators
  _requiredValidator(target, field) {
    const message =
      typeof this.errors.required === "function"
        ? this.errors.required()
        : this.errors.required;

    if (!target.length)
      return {
        field,
        message,
      };
    else return true;
  }

  _minValidator(target, field, min) {
    const message =
      typeof this.errors.min === "function"
        ? this.errors.min(min)
        : this.errors.min;

    if (target.length < min)
      return {
        field,
        message,
      };
    else return true;
  }

  _maxValidator(target, field, max) {
    const message =
      typeof this.errors.max === "function"
        ? this.errors.max(max)
        : this.errors.max;

    if (target.length > max)
      return {
        field,
        message,
      };
    else return true;
  }

  _emailValidator(target, field) {
    const re =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const message =
      typeof this.errors.email === "function"
        ? this.errors.email()
        : this.errors.email;
    if (!re.test(target))
      return {
        field,
        message,
      };
    else return true;
  }

  errors = {
    required: "Поле обязательно для заполнения",
    email: "Введите валидный email",
    min: (min) => `Минимум ${min} символов`,
    max: (max) => `Максимум ${max} символов`,
  };
}

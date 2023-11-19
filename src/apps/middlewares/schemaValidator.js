const {Validator} = require("jsonschema");
const v = new Validator();

const schemaValidator = (schema) => (req, res, next) => {
	const result = v.validate(req.body, schema);
	if (!result.valid) {
		const arMessageError = [];

		for(const item of result.errors) {
			arMessageError.push(item.message.replace("\"", "").replace("\"", ""));
		}
		return res.status(401).send({
			schemaError: arMessageError
		});
	}
	return next();
};

module.exports = schemaValidator;
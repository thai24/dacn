import Joi, { number, string } from "joi";

const SchemaProduct = Joi.object({
      caterory: Joi.number().required().min(1),
      brand:Joi.number().required().min(1),
      name:Joi.string().required().min(5),
      price: Joi.number().required().min(1),
      description:Joi.string().required(),
      size:Joi.array().items(Joi.number()).required(),
      color: Joi.array().items(Joi.number()).required(),
      quantity:Joi.number().required().min(1)
      // image:Joi.string()
})
export default SchemaProduct

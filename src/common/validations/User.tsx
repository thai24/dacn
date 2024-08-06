import Joi from "joi";

const schemaUser = Joi.object({
    nameUser:Joi.string().required().min(5),
    email:Joi.string().required(),
    password:Joi.string().required().min(8),
})
export default schemaUser